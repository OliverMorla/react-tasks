import { body } from "express-validator";

const loginValidator = [body("email").isEmail().withMessage("Invalid email")];

const createValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("email").not().isEmpty().withMessage("Email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  //   body("password").isEmpty().withMessage("Password is required"),
  //   body("name").isEmpty().withMessage("Name is required"),
  //   body("photoUrl").isEmpty().withMessage("Photo URL is required"),
];

export { loginValidator, createValidator };
