import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    storeName: { type: String, required: true },
    storeDescription: { type: String },
    storeAddress: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product", default: {}}],
    status: { type: String, enum: ["active", "banned"], default: "active" },
  },
  { timestamps: true }
);

const sellerModel =
mongoose.models.seller || mongoose.model("seller", sellerSchema);
export default sellerModel;
