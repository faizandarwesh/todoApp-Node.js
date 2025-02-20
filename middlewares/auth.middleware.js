import { STATUS_CODES } from "../constants.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

export const verifyUserToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: "Unauthorized user",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: "Unauthorized user",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      message: "Something went wrong",
      error: error,
    });
  }
};
