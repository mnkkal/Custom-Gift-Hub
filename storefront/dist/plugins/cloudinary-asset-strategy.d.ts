import { AssetPreviewStrategy, AssetStorageStrategy, RequestContext } from "@vendure/core";
import { Stream } from "stream";
export declare class CloudinaryAssetStorageStrategy implements AssetStorageStrategy {
    constructor();
    writeFileFromBuffer(fileName: string, data: Buffer): Promise<string>;
    writeFileFromStream(fileName: string, data: Stream): Promise<string>;
    readFileToBuffer(identifier: string): Promise<Buffer>;
    readFileToStream(identifier: string): Promise<Stream>;
    deleteFile(identifier: string): Promise<void>;
    fileExists(fileName: string): Promise<boolean>;
    toAbsoluteUrl(request: any, identifier: string): string;
}
export declare class CloudinaryAssetPreviewStrategy implements AssetPreviewStrategy {
    generatePreviewImage(ctx: RequestContext, mimeType: string, data: Buffer): Promise<Buffer>;
}
