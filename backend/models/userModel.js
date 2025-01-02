import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    }, 
    cartData: { type: Object, default: {} },
    avatar: { type: String },
    phone: { type: String },
    address: { type: String },
    zipCode: {type: String},
    street: {type: String},
    status: { type: String, enum: ["active", "banned"], default: "active" },
    lastLoginAt: { type: Date },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
