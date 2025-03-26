import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }

  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Fix `decoded.id`

    if (!req.user) {
      res.status(401);
      throw new Error("User not found.");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403); // Change to 403 (Forbidden) for better security
    throw new Error("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
