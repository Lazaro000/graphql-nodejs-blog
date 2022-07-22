import { jwt } from 'jsonwebtoken';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const createJWTToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET || 'default_jwt_secret', {
    expiresIn: '1h',
  });
};
