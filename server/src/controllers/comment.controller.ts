import type { Request, Response } from "express";
import type { WhereFilterProps, WhereFilterValue } from "../types";
import { queryOptions } from "../entities";
import prisma from "../lib/prisma";

/**
 * Handles the retrieval of comments with optional filtering and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the comments or error messages.
 */
const getComments = async (req: Request, res: Response) => {
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
    const comments = await prisma.comment.findMany({
      where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
      include: {
        user:
          (embed === "user" && !include) || include === "all"
            ? {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  photoUrl: true,
                  role: true,
                },
              }
            : false,
        task: (embed === "task" && !include) || include === "all",
      },
      skip: page ? parseInt(page as string) * 10 : 0, // Pagination offset calculation.
      take: limit ? parseInt(limit as string) : 10, // Number of items to retrieve.
    });

    // Successful retrieval
    if (comments) {
      return res.status(200).json({
        ok: true,
        message: "Comments retrieved successfully",
        data: comments,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving comments",
      error: err instanceof Error ? err.message : null,
    });
  }
};

/**
 * Retrieves a comment by its unique identifier.
 *
 * @param req Express request object, containing the comment ID.
 * @param res Express response object for sending back the comment or error messages.
 */
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

    // Successful retrieval
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
