import express from 'express';
import {updateStatus,userOrders,allOrders,placeOrder,placeOrderRazorPay,placeOrderStripe} from '../controllers/orderController.js'
import roleAuth from '../middleware/roleAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router();

//Seller Features
orderRouter.post('/list',roleAuth('seller'),allOrders);
orderRouter.post('/status', roleAuth('seller'), updateStatus);

//Payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorPay);

//User Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;