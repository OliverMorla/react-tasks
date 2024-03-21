"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectValidator = exports.createUserValidator = exports.loginUserValidator = void 0;
const express_validator_1 = require("express-validator");
const loginUserValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
];
exports.loginUserValidator = loginUserValidator;
const createUserValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("password")
        .isLength({
        min: 6,
    })
        .withMessage("Password length should be more than 6 characters"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("photoUrl").optional().isURL().withMessage("Invalid URL"),
];
exports.createUserValidator = createUserValidator;
const createProjectValidator = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
];
exports.createProjectValidator = createProjectValidator;
