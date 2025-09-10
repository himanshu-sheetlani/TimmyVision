// Importing required modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// JWT token generate function
export const generateJwt = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", 
  });
  return token;
};
