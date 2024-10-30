//placing orders using COD Method
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
const placeOrder = async  (req,res)=> {
    try {
        const{userId,items,amount,address} = req.body;

        const orderData  = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success: true, msg:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, msg: error.message})
    }

}
const placeOrderStripe = async  (req,res)=> {

}

const placeOrderRazorPay= async  (req,res)=> {

}
//All Orders data for Seller Panel
const allOrders = async (req,res) => {
    
}
const userOrders = async (req,res) => {

}
//update order status from seller panel
const updateStatus = async (req,res) => {

}

export {updateStatus,userOrders,allOrders,placeOrder,placeOrderRazorPay,placeOrderStripe}