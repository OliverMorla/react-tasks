"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectValidator = exports.updateUserValidator = exports.signUpUserValidator = exports.signInUserValidator = void 0;
const express_validator_1 = require("express-validator");
const signInUserValidator = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("password")
        .isLength({
        min: 6,
    })
        .withMessage("Password length should be more than 6 characters"),
];
exports.signInUserValidator = signInUserValidator;
const signUpUserValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password length should be more than 6 characters"),
    (0, express_validator_1.body)("photoUrl").optional().isURL().withMessage("Invalid URL"),
];
exports.signUpUserValidator = signUpUserValidator;
const updateUserValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("name")
        .matches(/ ^[A-Za-z]+$/)
        .withMessage("Name must contain letters"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password").optional(),
    (0, express_validator_1.body)("password")
        .isLength({
        min: 6,
    })
        .withMessage("Password length should be more than 6 characters"),
];
exports.updateUserValidator = updateUserValidator;
const createProjectValidator = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
];
exports.createProjectValidator = createProjectValidator;
