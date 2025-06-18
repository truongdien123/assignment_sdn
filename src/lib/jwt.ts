import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "secret_key"; // nên để trong .env

export const signToken = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
