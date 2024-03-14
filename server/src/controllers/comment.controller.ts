import type { Request, Response } from "express";
import prisma from "../lib/prisma";

const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany();

    if (comments) {
      res.status(200).json({
        ok: true,
        message: "Comments retrieved successfully",
        data: comments,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving comments",
      error: err instanceof Error ? err.message : null,
    });
  }
};

export { getComments };
