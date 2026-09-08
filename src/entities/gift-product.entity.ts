import { VendureEntity } from "@vendure/core";
import { Entity, Column, Index } from "typeorm";
import { ProductType } from "../product-types";

@Entity()
@Index(["productType"])
export class GiftProduct extends VendureEntity {
  constructor(input?: Partial<GiftProduct>) {
    super(input);
  }

  @Column()
  name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "simple-array" })
  tags!: string[];

  @Column("jsonb", { default: {} })
  customFields!: Record<string, any>;

  @Column({ type: "varchar", enum: ProductType })
  productType!: ProductType;
}