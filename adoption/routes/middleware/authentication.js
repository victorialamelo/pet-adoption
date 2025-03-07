const jwt = require('jsonwebtoken');
const supersecret = process.env.SUPER_SECRET;

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, supersecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;