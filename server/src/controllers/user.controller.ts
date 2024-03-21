import type { Request, Response } from "express";
import type { WhereFilterProps, WhereFilterValue } from "../types";
import { validationResult } from "express-validator";
import { queryOptions } from "../entities";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

/**
 * Handles the retrieval of users with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the users or error messages.
 */
const getUsers = async (req: Request, res: Response) => {
  const { page, limit, embed, include } = req.query;
  let whereFilter: WhereFilterProps = {};

  // Build the filter object from query parameters, excluding reserved options.
  Object.entries(req.query).forEach(([key, value]) => {
    if (!queryOptions.includes(key)) {
      whereFilter[key] = value as WhereFilterValue;
    }
  });

  try {
    // Check if the include query parameter is set to "all" or a specific model.
    if (include) {
      const users = await prisma.user
        .findMany({
          where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
          include: {
            projects: (embed === "project" && !include) || include === "all",
            comments: (embed === "comment" && !include) || include === "all",
            connections:
              (embed === "connection" && !include) || include === "all",
            tasks: (embed === "task" && !include) || include === "all",
          },
          skip: page ? parseInt(page as string) * 10 : 0, // Pagination offset calculation.
          take: limit ? parseInt(limit as string) : 10, // Number of items to retrieve.
        })
        .then((users) =>
          users.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          })
        );

      // Successful retrieval
      if (users) {
        return res.status(200).json({
          ok: true,
          message: "Users retrieved successfully",
          data: users,
        });
      }
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        role: true,
      },
      where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
      skip: page ? parseInt(page as string) * 10 : 0, // Pagination offset calculation.
      take: limit ? parseInt(limit as string) : 10, // Number of items to retrieve.
    });

    // Successful retrieval
    if (users) {
      return res.status(200).json({
        ok: true,
        message: "Users retrieved successfully",
        data: users,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving users",
      error: err instanceof Error ? err.message : null,
    });
  }
};

/**
 * Fetches a single user by their ID.
 *
 * @param req Express request object, containing the ID parameter.
 * @param res Express response object for sending back the found connection or an error message.
 */
const getUserByID = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(200).json({
        ok: true,
        message: "User not found",
        data: user,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving user",
      error: err instanceof Error ? err.message : null,
    });
  }
};

/**
 * Creates a new user with the provided data.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 */
const createUser = async (req: Request, res: Response) => {
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
      console.error("=> HASH_ROUNDS does not exist");
      return;
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
    return res.status(500).json({
      message: "Error creating user",
      error: err instanceof Error ? err.message : null,
    });
  }
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param req Express request object, containing the user data.
 * @param res Express Response object, for sending back the success message or error messages.
 */
const loginUser = async (req: Request, res: Response) => {
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
      console.error("=> HASH_ROUNDS does not exist");
      return;
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

      if (!result) {
        return res.status(401).json({
          ok: false,
          message: "Wrong password",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "User logged in successfully",
      });
    });
  } catch (err) {
    return res.status(500).json({
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
 */
const logOutUser = async (req: Request, res: Response) => {};

/**
 * Updates a user with the provided data.
 *
 * @param req Express request object, containing the user data.
 * @param res Express response object for sending back the success message or error messages.
 */
const updateUser = async (req: Request, res: Response) => {
  const { name, email, password, photoUrl } = req.body;

  return res.status(201).json({
    ok: true,
    message: "User created successfully",
    data: {
      name,
      email,
      password,
      photoUrl,
    },
  });
};

/**
 * Deletes a user by their ID.
 *
 * @param req Express request object, containing the ID parameter.
 * @param res Express response object for sending back the success message or error messages.
 */
const deleteUser = async (req: Request, res: Response) => {
  try {
    const doesUserExist = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!doesUserExist) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }

    const user = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    if (user) {
      return res.status(201).json({
        ok: true,
        message: "User deleted successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving user",
      error: err instanceof Error ? err.message : null,
    });
  }
};

export {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logOutUser,
};
