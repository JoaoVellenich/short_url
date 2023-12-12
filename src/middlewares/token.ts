import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../environment/config";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");
  if (!token || token == "") {
    next();
    return;
  }
  jwt.verify(token.split(" ")[1], jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    res.locals.user = user;
    next();
  });
}
