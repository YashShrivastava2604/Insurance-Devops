import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.clearCookie("token");
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminRoute = async (req, res, next) => {
    if(req.user && req.user.role === "admin")
        next();
    else
        res.status(401).json({ message: "Not authorized as admin" })
}