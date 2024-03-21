import type { Request, Response } from "express";
import { WhereFilterProps, WhereFilterValue } from "../types";
import { queryOptions } from "../entities";
import prisma from "../lib/prisma";

/**
 * Handles the retrieval of connections with optional filtering, embedding, and pagination.
 * Allows filtering by any model attribute not explicitly reserved in queryOptions.
 * Supports embedding related models for richer data retrieval.
 *
 * @param req Express request object, containing query parameters for filtering and options.
 * @param res Express response object for sending back the connections or error messages.
 */
const getConnections = async (req: Request, res: Response) => {
  const { page, limit, embed, include } = req.query;
  let whereFilter: WhereFilterProps = {};

  // Build the filter object from query parameters, excluding reserved options.
  Object.entries(req.query).forEach(([key, value]) => {
    if (!queryOptions.includes(key)) {
      whereFilter[key] = value as WhereFilterValue;
    }
  });

  try {
    const connections = await prisma.connection.findMany({
      where: Object.keys(whereFilter).length > 0 ? whereFilter : {},
      include: {
        project: (embed === "project" && !include) || include === "all",
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
      },
      skip: page ? parseInt(page as string) * 10 : 0, // Pagination offset calculation.
      take: limit ? parseInt(limit as string) : 10, // Number of items to retrieve.
    });

    if (connections) {
      // Successful retrieval
      return res.status(200).json({
        ok: true,
        message: "Connections retrieved successfully",
        data: connections,
      });
    }
  } catch (err) {
    // Error handling
    return res.status(500).json({
      message: "Error retrieving connections",
      error: err instanceof Error ? err.message : null,
    });
  }
};

/**
 * Fetches a single connection by its ID.
 *
 * @param req Express request object, containing the ID parameter.
 * @param res Express response object for sending back the found connection or an error message.
 */
const getConnectionByID = async (req: Request, res: Response) => {
  try {
    const connection = await prisma.connection.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!connection) {
      return res.status(404).json({
        ok: false,
        message: "Connection not found",
      });
    }

    // Successful retrieval
    return res.status(200).json({
      ok: true,
      message: "Connection found",
      data: connection,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving connection",
      error: err instanceof Error ? err.message : null,
    });
  }
};

// Placeholder for future implementation.
const createConnection = async (req: Request, res: Response) => {
  // Implement logic to create a connection
};

// Placeholder for future implementation.
const deleteConnection = async (req: Request, res: Response) => {
  // Implement logic to delete a connection
};

export {
  getConnections,
  getConnectionByID,
  createConnection,
  deleteConnection,
};
