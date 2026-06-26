import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret");

      // Get admin from the token and attach to request object
      req.user = await Admin.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, admin not found");
      }

      if (req.user.role !== "admin") {
        res.status(403);
        throw new Error("Forbidden, admin access only");
      }

      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, no token provided");
    }
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(401);
    }
    next(new Error(error.message || "Not authorized, token validation failed"));
  }
};
