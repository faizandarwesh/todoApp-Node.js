import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/login", login);
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
