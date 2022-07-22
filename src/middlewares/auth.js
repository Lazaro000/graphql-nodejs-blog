import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET || 'default_jwt_secret'
  );

  req.verifiedUser = verified.user;

  next();
};
