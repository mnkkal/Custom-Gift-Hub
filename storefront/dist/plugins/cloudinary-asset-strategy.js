"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryAssetPreviewStrategy = exports.CloudinaryAssetStorageStrategy = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
function extractPublicId(identifier) {
    if (!identifier.startsWith("http")) {
        return identifier;
    }
    try {
        const url = new URL(identifier);
        const parts = url.pathname.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex !== -1) {
            let pathAfterUpload = parts.slice(uploadIndex + 1);
            if (pathAfterUpload[0]?.startsWith("v") && /^\d+$/.test(pathAfterUpload[0].slice(1))) {
                pathAfterUpload = pathAfterUpload.slice(1);
            }
            return pathAfterUpload.join("/").replace(/\.[^.]+$/, "");
        }
    }
    catch { }
    return identifier;
}
class CloudinaryAssetStorageStrategy {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
    }
    async writeFileFromBuffer(fileName, data) {
        return new Promise((resolve, reject) => {
            const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.[^.]+$/, "");
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: "custom-gift-hub",
                public_id: `${Date.now()}-${cleanFileName}`,
                resource_type: "auto",
            }, (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Cloudinary upload failed"));
                }
                resolve(result.secure_url || result.url);
            });
            uploadStream.end(data);
        });
    }
    async writeFileFromStream(fileName, data) {
        const chunks = [];
        return new Promise((resolve, reject) => {
            data.on("data", (chunk) => chunks.push(chunk));
            data.on("end", () => {
                const buffer = Buffer.concat(chunks);
                this.writeFileFromBuffer(fileName, buffer).then(resolve).catch(reject);
            });
            data.on("error", reject);
        });
    }
    async readFileToBuffer(identifier) {
        const url = identifier.startsWith("http") ? identifier : this.toAbsoluteUrl(null, identifier);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch asset from Cloudinary: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
    async readFileToStream(identifier) {
        const buffer = await this.readFileToBuffer(identifier);
        return stream_1.Readable.from(buffer);
    }
    async deleteFile(identifier) {
        const publicId = extractPublicId(identifier);
        await cloudinary_1.v2.uploader.destroy(publicId);
    }
    async fileExists(fileName) {
        return false;
    }
    toAbsoluteUrl(request, identifier) {
        return identifier;
    }
}
exports.CloudinaryAssetStorageStrategy = CloudinaryAssetStorageStrategy;
class CloudinaryAssetPreviewStrategy {
    async generatePreviewImage(ctx, mimeType, data) {
        return data;
    }
}
exports.CloudinaryAssetPreviewStrategy = CloudinaryAssetPreviewStrategy;
