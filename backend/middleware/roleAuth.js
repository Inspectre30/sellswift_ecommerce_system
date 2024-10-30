// middleware/roleAuth.js
import userModel from '../models/userModel.js'; // Make sure to import your user model

const roleAuth = (expectedRole) => {
  return async (req, res, next) => {
    try {
      const { role } = req.headers; // Get the role from headers
      if (!role) {
        return res.status(403).json({ success: false, msg: 'Role not provided' });
      }

      // Fetch the user based on role
      const user = await userModel.findOne({ role });
      if (!user) {
        return res.status(403).json({ success: false, msg: 'User with this role does not exist' });
      }

      // Check if the provided role matches the user's role
      if (user.role !== expectedRole) {
        return res.status(403).json({ success: false, msg: `${expectedRole} access only` });
      }

      req.user = user; // Store user info for further use in the request lifecycle
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, msg: 'Server error' });
    }
  };
};

export default roleAuth;
