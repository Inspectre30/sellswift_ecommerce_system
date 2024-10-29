import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"; // Adjust the path as needed

const sellerAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, msg: "Not authorized. Login again!" });
        }

        // Decode the token to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Find the user in the database
        const user = await userModel.findById(userId);

        if (!user || user.role !== "seller") {
            return res.json({ success: false, msg: "Not authorized. Access restricted to sellers only." });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.log(err);
        res.json({ success: false, msg: err.message });
    }
};

export default sellerAuth;
