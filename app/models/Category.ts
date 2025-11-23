import mongoose, { Schema, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.Category || mongoose.model("Category", CategorySchema);
