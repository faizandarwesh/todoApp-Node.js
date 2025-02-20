import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { STATUS_CODES } from "../constants.js";
import { validationResult } from "express-validator";
import cookieParser from "cookie-parser";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log(`User : ${user}`);
    console.log(`AccessToken : ${accessToken}`);
    console.log(`RefreshToken : ${refreshToken}`);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    console.log(`User AFTER : ${user}`);

    return { refreshToken, accessToken };
  } catch (error) {
    console.log(`Something went wrong : ${error}`);
  }
};

export const logout = async (req , res) => {
  // Get user token from cookies or from headers (incase for mobile users)
  // Check the user is authenticated
  // Clear cookies
  // Clear refresh and authentication tokens

  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  const options = {
    httpOnly : true,
    secure : true
  }

  return res.status(STATUS_CODES.SUCCESS)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json({
    message : 'User logged out successfully'
  })
}

export const login = async (req, res) => {
  //Server side Validation for email and password
  //Check the user in the database using email
  //If email exists in database check for password
  //If password is correct
  //Generate access and refresh token
  //Store refresh token in database and browser cookies
  //Return [200] Success status code and return user object if all good
  //Otherwise return relevant error and status code

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Something went wrong",
        errors: validationErrors.array(),
      });
    }

    const { email, password } = req.body;
    console.log(`User Email & Password  : ${email} -- ${password}`);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid user credentials",
      });
    }

    const isCorrect = await user.isPasswordCorrect(password);
    console.log(`User Password Status : ${isCorrect}`);

    if (!isCorrect) {
      return res.status(401).json({
        message: "Invalid user credentials",
      });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user._id
    );

    console.log(`AccessToken inside : ${accessToken}`);
    console.log(`RefreshToken inside : ${refreshToken}`);

    const loggedInUser = await User.findById(user._id).select(
      "-password  -refreshToken"
    );

    console.log(`LoggedIn User : ${loggedInUser}`);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(STATUS_CODES.SUCCESS)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged in successfully",
      });
  } catch (error) {
    console.error(`[login] Error: ${error.message}`, error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const register = async (req, res) => {
  //Server side Validation for username , email and password
  //Check the user in the database using email if already exists return email already exists
  // If email not exist then we can create a new user
  //Need to hash password before saving into the database
  // If all good then Return [200] Success status code and return user object if all good
  //Otherwise return relevant error and status code

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Something went wrong",
        errors: validationErrors.array(),
      });
    }

    const { username, email, password } = req.body;

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
