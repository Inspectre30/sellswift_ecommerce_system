import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import adminRouter from "./routes/adminRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/updateProfileRoute.js";
const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

const allowedOrigins = ['http://localhost:5173','http://localhost:5174','http://localhost:5175'];
//middlewares
app.use(express.json());
app.use(cors({origin: allowedOrigins,credentials: true}));
app.use(cookieParser())
express.urlencoded({ extended: true })

//api-endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/profile", profileRouter);
app.get("/", (req, res) => {
  res.send("API WORKING :>");
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

