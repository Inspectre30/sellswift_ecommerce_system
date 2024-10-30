//add products  to user cart

import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Added To Cart Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
//update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Cart Updated!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};
//get user cart data
const getUserCart = async (req, res) => {
  try {

    const {userId} = req.body;
    const userData = await userModel.findById(userId)
    let cartData =  await userCartData;

  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export { addToCart, updateCart, getUserCart };

//10:23:02