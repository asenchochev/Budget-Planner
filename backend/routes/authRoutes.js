import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Името е задължително"),
    body("email").isEmail().withMessage("Невалиден имейл"),
    body("password").isLength({ min: 6 }).withMessage("Паролата трябва да е поне 6 символа"),
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Невалиден имейл"),
    body("password").notEmpty().withMessage("Паролата е задължителна"),
  ],
  validate,
  loginUser
);

router.get("/me", protect, getMe);

export default router;
