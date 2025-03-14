const jwt = require('jsonwebtoken');
require('dotenv').config();

const supersecret = process.env.SUPER_SECRET;

function authenticate(req, res, next) {
  console.log('Auth header received:', req.headers.authorization);
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Extracted token:', token);
  console.log('Secret key length:', supersecret ? supersecret.length : 'undefined');

  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, supersecret);
    req.user = decoded;
    console.log('Decoded user:', req.user);
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(400).send({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
