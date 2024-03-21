import type { Request, Response, NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (true) {
    next();
  }
};

// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies?.session;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }

//   if (!process.env.JWT_SECRET) {
//     console.error("=> JWT_SECRET environment variable is not set.");
//     return res.status(500).json({ message: "Internal server error." });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // @ts-ignore
//     req.user = decoded; // Optionally add the decoded user info to the request
//     next(); // Proceed to the next middleware/route handler
//   } catch (err) {
//     if (err instanceof jwt.TokenExpiredError) {
//       return res
//         .status(401)
//         .json({ message: "Session expired. Please login again." });
//     } else if (err instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({ message: "Invalid token." });
//     } else {
//       return res.status(500).json({ message: "Could not verify token." });
//     }
//   }
// };

export { isAuthenticated };
