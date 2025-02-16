import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(user: UserPayload): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): UserPayload {
  return jwt.verify(token, JWT_SECRET) as UserPayload;
}