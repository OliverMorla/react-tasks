import type { Request, Response } from "express";
import prisma from "../lib/prisma";

const getConnections = async (req: Request, res: Response) => {
  try {
    const connections = await prisma.connection.findMany({});

    if (connections) {
      return res.status(200).json({
        ok: true,
        message: "Connections retrieved successfully",
        data: connections,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving connections",
      error: err instanceof Error ? err.message : null,
    });
  }
};

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
        data: connection,
      });
    }

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
export { getConnections, getConnectionByID };
