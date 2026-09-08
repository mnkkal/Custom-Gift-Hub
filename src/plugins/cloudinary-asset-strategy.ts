import { AssetPreviewStrategy, AssetStorageStrategy, RequestContext } from "@vendure/core";
import { v2 as cloudinary } from "cloudinary";
import { Readable, Stream } from "stream";

function extractPublicId(identifier: string): string {
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
  } catch {}
  return identifier;
}

export class CloudinaryAssetStorageStrategy implements AssetStorageStrategy {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  async writeFileFromBuffer(fileName: string, data: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.[^.]+$/, "");
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "custom-gift-hub",
          public_id: `${Date.now()}-${cleanFileName}`,
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed"));
          }
          resolve(result.secure_url || result.url);
        }
      );
      uploadStream.end(data);
    });
  }

  async writeFileFromStream(fileName: string, data: Stream): Promise<string> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      data.on("data", (chunk: Buffer) => chunks.push(chunk));
      data.on("end", () => {
        const buffer = Buffer.concat(chunks);
        this.writeFileFromBuffer(fileName, buffer).then(resolve).catch(reject);
      });
      data.on("error", reject);
    });
  }

  async readFileToBuffer(identifier: string): Promise<Buffer> {
    const url = identifier.startsWith("http") ? identifier : this.toAbsoluteUrl(null, identifier);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch asset from Cloudinary: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async readFileToStream(identifier: string): Promise<Stream> {
    const buffer = await this.readFileToBuffer(identifier);
    return Readable.from(buffer);
  }

  async deleteFile(identifier: string): Promise<void> {
    const publicId = extractPublicId(identifier);
    await cloudinary.uploader.destroy(publicId);
  }

  async fileExists(fileName: string): Promise<boolean> {
    return false;
  }

  toAbsoluteUrl(request: any, identifier: string): string {
    return identifier;
  }
}

export class CloudinaryAssetPreviewStrategy implements AssetPreviewStrategy {
  async generatePreviewImage(ctx: RequestContext, mimeType: string, data: Buffer): Promise<Buffer> {
    return data;
  }
}