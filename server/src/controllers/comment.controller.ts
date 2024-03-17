import type { Request, Response } from "express";
import prisma from "../lib/prisma";

const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany();

    if (comments) {
      return res.status(200).json({
        ok: true,
        message: "Comments retrieved successfully",
        data: comments,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving comment",
      error: err instanceof Error ? err.message : null,
    });
  }
};

const getCommentByID = async (req: Request, res: Response) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!comment) {
      return res.status(404).json({
        ok: false,
        message: "Comment not found",
        data: comment,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Comment found",
      data: comment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving comment",
      error: err instanceof Error ? err.message : null,
    });
  }
};

export { getComments, getCommentByID };
