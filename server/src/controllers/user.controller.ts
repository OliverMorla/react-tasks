import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import { validationResult } from "express-validator";

// /api/users - GET - Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (users) {
      res.status(200).json({
        ok: true,
        message: "Users retrieved successfully",
        data: users,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving users",
      error: err instanceof Error ? err.message : null,
    });
  }
};

// /api/users/:id - GET - Get user by ID
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

const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { name, email, password, photoUrl } = req.body;

  if (!name || !email || !password || !photoUrl) {
    return res.status(400).json({
      ok: false,
      message: "All fields are required",
    });
  }

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
const updateUser = async (req: Request, res: Response) =>  {
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
      return res.status(200).json({
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

export { getUsers, getUserByID, createUser, updateUser, deleteUser };
