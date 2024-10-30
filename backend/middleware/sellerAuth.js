// middleware/sellerAuth.js
// import jwt from 'jsonwebtoken';

// const sellerAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(403).json({ success: false, msg: 'Authorization required' });
//     console.log("Token received:", token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded.role)
  
//     if (decoded.role !== 'seller') {
//       return res.status(403).json({ success: false, msg: 'Seller access only' });
//     }

//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, msg: 'Invalid token' });
//   }
// };

// export default sellerAuth;
//8:57:37