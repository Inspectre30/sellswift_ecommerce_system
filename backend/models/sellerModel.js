import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    phone: { type: String },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isEmailAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    storeName: { type: String, required: true },
    storeDescription: { type: String },
    storeAddress: { type: String },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Ensure this matches the collection name for your Product model
        default: [],
      },
    ],
    inventory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inventory", 
      required: true,
    },
    status: { type: String, enum: ["active", "banned"], default: "active" },
    permit: {
      documentUrl: { type: String, required: false }, // URL of the uploaded permit document
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
      submittedAt: { type: Date }, // Date the permit was submitted
      reviewedAt: { type: Date }, // Date the permit was reviewed
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "admin" }, // Admin who reviewed the permit
      rejectionReason: { type: String, default: "" }, // Reason for rejection, if applicable
    },
  },
  { timestamps: true }
);

const sellerModel = mongoose.models.seller || mongoose.model("seller", sellerSchema);
export default sellerModel;



// import mongoose from "mongoose";

// const sellerSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     verifyOtp: { type: String, default: "" },
//     phone: {type:String},
//     verifyOtpExpireAt: { type: Number, default: 0 },
//     isEmailAccountVerified: { type: Boolean, default: false },
//     resetOtp: { type: String, default: "" },
//     resetOtpExpireAt: { type: Number, default: 0 },
//     storeName: { type: String, required: true },
//     storeDescription: { type: String },
//     storeAddress: { type: String },
  
//     status: { type: String, enum: ["active", "banned"], default: "active" },
//     permit: {
//       documentUrl: { type: String, required: false }, // URL of the uploaded permit document (e.g., stored in Cloudinary or other storage service)
//       status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Current status of the permit
//       submittedAt: { type: Date }, // Date the permit was submitted
//       reviewedAt: { type: Date }, // Date the permit was reviewed
//       reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "admin" }, // Admin who reviewed the permit
//       rejectionReason: { type: String, default: "" }, // Reason for rejection, if applicable
//     },
    
//   },
//   { timestamps: true }
// );

// const sellerModel =
// mongoose.models.seller || mongoose.model("seller", sellerSchema);
// export default sellerModel;
