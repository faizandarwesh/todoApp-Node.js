import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { verifyUserToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  login
);

router.post("/logout", verifyUserToken, logout);

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("username").notEmpty().withMessage("Username is a required field"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  register
);

export default router;
