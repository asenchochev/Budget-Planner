import { validationResult } from "express-validator";

/**
 * Прихваща резултатите от express-validator проверките,
 * декларирани в съответния route, и връща 400 при грешка.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return res.json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};
