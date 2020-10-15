import jwt from 'jsonwebtoken';

const createJwt = (id: number): string => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_TOKEN || '',
  );
  return token;
};

export default createJwt;
