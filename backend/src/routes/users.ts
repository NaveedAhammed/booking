import express from "express";
import { login, logout, register, validateToken } from "../controllers/users";
import { check } from "express-validator";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  login
);

router.post("/logout", logout);

router.get("/validate-token", verifyToken, validateToken);

export default router;
