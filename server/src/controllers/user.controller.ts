import type { Request, Response } from "express";
import prisma from "../lib/prisma";

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
      res.status(200).json({
        ok: true,
        message: "User not found",
        data: user,
      });
    }

    res.status(200).json({
      ok: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving user",
      error: err instanceof Error ? err.message : null,
    });
  }
};
const createUser = async (req: Request, res: Response) => {};
const updateUser = async (req: Request, res: Response) => {};
const deleteUser = async (req: Request, res: Response) => {};

export { getUsers, getUserByID, createUser, updateUser, deleteUser };
