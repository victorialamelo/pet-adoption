const jwt = require('jsonwebtoken');
require('dotenv').config();

const supersecret = process.env.SUPER_SECRET;

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, supersecret);
    req.user = decoded;
    console.log('Decoded user:', req.user);
    next();
  } catch (err) {
    return res.status(400).send({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;