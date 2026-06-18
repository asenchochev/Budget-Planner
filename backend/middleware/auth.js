import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

/**
 * Защитава маршрути - очаква "Authorization: Bearer <token>".
 * При валиден токен закача req.user (без паролата) и пуска заявката напред.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Нямате достъп - липсва токен за оторизация");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      res.status(401);
      throw new Error("Потребителят, свързан с токена, не съществува");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Нямате достъп - невалиден или изтекъл токен");
  }
});
