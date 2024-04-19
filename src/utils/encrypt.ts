import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { envs } from '../config';

const JWT_SECRET = envs.JWT_SECRET;

export const uuid = (): string => {
    return uuidv4();
}

export const bcryptAdapter = {

    hash: (password: string) => {
      const salt = genSaltSync();
      return hashSync(password, salt)
    },
  
    compare: (password:string, hashed: string) => {
      return compareSync(password, hashed);
    }
  
  }

export class JWTAdapter {
    static async generateToken(payload: any, duration: string = '2h') {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) resolve(null);
                resolve(decoded as T);
            });
        });
    }

}