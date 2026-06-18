import jwt from "jsonwebtoken";

/**
 * Генерира JWT токен за дадено user id.
 * Подписва се със секрета от env и изтича според JWT_EXPIRES_IN.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

export default generateToken;
