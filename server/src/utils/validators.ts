import type { ValidationChain } from "express-validator";
import { body } from "express-validator";

const loginUserValidator: ValidationChain[] = [
  body("email").isEmail().withMessage("Invalid email"),
];

const createUserValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("email").notEmpty().withMessage("Email is required"),

  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password length should be more than 6 characters"),

  body("name").notEmpty().withMessage("Name is required"),
  body("photoUrl").optional().isURL().withMessage("Invalid URL"),
];

const createProjectValidator = [
  body("title").notEmpty().withMessage("Title is required"),
];

export { loginUserValidator, createUserValidator, createProjectValidator };
