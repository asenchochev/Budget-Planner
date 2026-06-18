/**
 * Хваща несъществуващи маршрути - подава нататък към errorHandler.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Маршрутът не е намерен - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Централен error handler. express-async-handler препраща грешките тук
 * вместо да гърми сървъра, така че всеки controller може да хвърля Error
 * без try/catch блокове навсякъде.
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  // Mongoose невалиден ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Ресурсът не е намерен";
  }

  // Mongoose duplicate key (напр. имейл вече съществува)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0];
    message = `Записът с тази стойност за "${field}" вече съществува`;
  }

  // Mongoose validation грешки
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
