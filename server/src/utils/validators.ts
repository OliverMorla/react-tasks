import type { ValidationChain } from "express-validator";
import { body } from "express-validator";

const signInUserValidator: ValidationChain[] = [
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password length should be more than 6 characters"),
];

const signUpUserValidator: ValidationChain[] = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password length should be more than 6 characters"),

  body("photoUrl").optional().isURL().withMessage("Invalid URL"),
];

const updateUserValidator: ValidationChain[] = [
  body("name").notEmpty().withMessage("Name is required"),
  body("name")
    .matches(/ ^[A-Za-z]+$/)
    .withMessage("Name must contain letters"),

  body("email").isEmail().withMessage("Invalid email"),

  body("password").optional(),
  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password length should be more than 6 characters"),
];

const createProjectValidator: ValidationChain[] = [
  body("title").notEmpty().withMessage("Title is required"),
];

export {
  signInUserValidator,
  signUpUserValidator,
  updateUserValidator,
  createProjectValidator,
};
