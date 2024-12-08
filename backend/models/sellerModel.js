import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    storeName: { type: String, required: true },
    storeDescription: { type: String },
    storeAddress: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

const sellerModel = mongoose.models.seller || mongoose.model("seller", sellerSchema);
export default sellerModel;
