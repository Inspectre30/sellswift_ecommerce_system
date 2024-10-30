import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { removeUser,getAllUsers } from "../controllers/adminController.js";
const adminRouter = express.Router();

//route for removing users
adminRouter.post('/rm-users',adminAuth,removeUser);
//router for retrieving list of users
adminRouter.get('/get-users',adminAuth,getAllUsers);

export default adminRouter;

