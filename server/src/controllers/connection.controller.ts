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
    res.status(500).json({
      message: "Error retrieving connections",
      error: err instanceof Error ? err.message : null,
    });
  }
};

export { getConnections };
