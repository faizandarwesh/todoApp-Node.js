import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { STATUS_CODES } from "../constants.js";
import {validationResult} from "express-validator";

export const login = async (req, res) => {};

export const register = async (req, res) => {
  try {

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            message : "Something went wrong",
            errors : validationErrors.array()
        })
    }

    const { username, email, password } = req.body;

    // if ([username, email, password].some((field) => field?.trim() === "")) {
    //   return res.status(STATUS_CODES.BAD_REQUEST).json({
    //     message: "Please fill the required fields",
    //   });
    // }

    const isUserExist = await User.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (isUserExist) {
      return res
        .status(STATUS_CODES.ALREADY_EXIST)
        .json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    }

    return res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "User created successfully", user: createdUser });
  } catch (error) {
    console.error(`[register] Error: ${error.message}`, error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};
