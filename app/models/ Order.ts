import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: String, required: false },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    shipping: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pin: String,
    },
    paymentMethod: { type: String, enum: ["COD", "UPI", "CARD"], required: true },
    subtotal: Number,
    shippingFee: Number,
    tax: Number,
    total: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", OrderSchema);
