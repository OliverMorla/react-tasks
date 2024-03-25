import type { NextFunction, Request, Response } from "express";
import type { WhereFilterProps, WhereFilterValue } from "../types";
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { queryOptions } from "../entities";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

/**
 * Creates a new user with the provided data.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 *
 * @returns A promise that reveals whether the user was created successfully or not.
 */
const signUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      ok: false,
      message: "All fields are required",
    });
  }

  try {
    if (!process.env.HASH_ROUNDS) {
      throw new Error("Missing required environment variable: HASH_ROUNDS");
    }

    const doesUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (doesUserExist) {
      return res.status(409).json({
        ok: false,
        message: "User already exists",
      });
    }

    bcrypt.genSalt(parseInt(process.env.HASH_ROUNDS), async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message: "Error hashing password",
            error: err instanceof Error ? err.message : null,
          });
        }

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        if (!user) {
          return res.status(500).json({
            ok: false,
            message: "Error creating user",
          });
        }

        return res.status(201).json({
          ok: true,
          message: "User created successfully",
        });
      });
    });
  } catch (err) {
    console.error(err instanceof Error ? err.message : null);
    return res.status(500).json({
      ok: false,
      message: "Error creating user",
      error: "An unexpected error occurred",
    });
  }
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param req Express request object, containing the user data.
 * @param res Express Response object, for sending back the success message or error messages.
 *
 * @returns A promise that reveals whether the user was logged in successfully or not.
 */
const signIn = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      ok: false,
      message: "All fields are required",
    });
  }

  try {
    if (!process.env.HASH_ROUNDS) {
      throw new Error("Missing required environment variable: HASH_ROUNDS");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error comparing passwords",
          error: err instanceof Error ? err.message : null,
        });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("Missing required environment variable: JWT_SECRET");
      }

      const jwtSecret = process.env.JWT_SECRET;

      if (!result) {
        return res.status(401).json({
          ok: false,
          message: "Wrong password",
        });
      }

      const token = jwt.sign(user, jwtSecret, {
        expiresIn: "24h",
      });

      if (!token) {
        return res.status(500).json({
          ok: false,
          message: "Error creating token",
        });
      }

      // Send the token in a cookie
      res.cookie("session", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production" ? true : false,
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      return res.status(200).json({
        ok: true,
        message: "User logged in successfully",
      });
    });
  } catch (err) {
    console.error(err instanceof Error ? err.message : null);
    return res.status(500).json({
      ok: false,
      message: "Error logging in",
      error: err instanceof Error ? err.message : null,
    });
  }
};

/**
 * Logs out a user by invalidating their session.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 *
 * @returns A promise that reveals whether the user was logged out successfully or not.
 */
const signOut = async (req: Request, res: Response) => {
  res.clearCookie("session");
  return res.status(200).json({
    ok: true,
    message: "User logged out successfully",
  });
};

/**
 *
 * @param req Express request object, that contains the session token
 * @param res Express response object for sending back the success message or error messages
 *
 * @returns A promise that reveals whether the session was found or not
 */
const session = async (req: Request, res: Response) => {
  if (!process.env.JWT_SECRET) {
    console.error("=> Failed to read .env in session");
    return res.status(500).json({
      message: "Internal server error",
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  const token = req.cookies?.session;

  if (!token) {
    return res.status(401).json({
      message: "No session found",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    // If verification is successful and the token hasn't expired, continue

    return res.status(200).json({
      ok: true,
      message: "Session found",
      data: decoded,
    });
  } catch (err) {
    // Check if the error is because the token has expired
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Session expired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      // The error is because the token is invalid
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Handle other possible errors (e.g., jwt.NotBeforeError or any other error)
      return res.status(500).json({ message: "Could not verify token" });
    }
  }
};
export { signUp, signIn, signOut, session };
