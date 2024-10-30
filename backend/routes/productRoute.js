import express from "express";
import {
  listProducts,
  removeProduct,
  singleProduct,
  addProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import roleAuth from "../middleware/roleAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",roleAuth('seller'),
  upload.fields([{ name: 'image1', maxCount: 1 },{ name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }]),
  addProduct
);
productRouter.post("/remove",roleAuth('seller'), removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
