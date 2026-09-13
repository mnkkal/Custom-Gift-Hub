"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftProduct = void 0;
const core_1 = require("@vendure/core");
const typeorm_1 = require("typeorm");
const product_types_1 = require("../product-types");
let GiftProduct = class GiftProduct extends core_1.VendureEntity {
    constructor(input) {
        super(input);
    }
    name;
    price;
    tags;
    customFields;
    productType;
};
exports.GiftProduct = GiftProduct;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GiftProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], GiftProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array" }),
    __metadata("design:type", Array)
], GiftProduct.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { default: {} }),
    __metadata("design:type", Object)
], GiftProduct.prototype, "customFields", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", enum: product_types_1.ProductType }),
    __metadata("design:type", String)
], GiftProduct.prototype, "productType", void 0);
exports.GiftProduct = GiftProduct = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(["productType"]),
    __metadata("design:paramtypes", [Object])
], GiftProduct);
