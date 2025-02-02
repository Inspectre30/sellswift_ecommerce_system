import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode)

    if (token_decode) {
      req.body.userId = token_decode.id;
      console.log(req.body.userId);
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
