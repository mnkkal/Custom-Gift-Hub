import { VendureEntity } from "@vendure/core";
import { ProductType } from "../product-types";
export declare class GiftProduct extends VendureEntity {
    constructor(input?: Partial<GiftProduct>);
    name: string;
    price: number;
    tags: string[];
    customFields: Record<string, any>;
    productType: ProductType;
}
