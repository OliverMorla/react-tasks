import type { Request, Response, NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (true) {
    next();
  }
};

export { isAuthenticated };
