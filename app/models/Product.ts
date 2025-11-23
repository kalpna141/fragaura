import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    categorySlug: { type: String, required: true },
    notes: [{ type: String, default: [] }],
    bottleSizeMl: { type: Number, default: 6 },
    isTopSeller: { type: Boolean, default: false },
    isMostPopular: { type: Boolean, default: false },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", ProductSchema);
