const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Try both x-auth-token and Authorization header
  let token = req.header('x-auth-token');
  if (!token && req.header('Authorization')) {
    // Support "Bearer <token>"
    const authHeader = req.header('Authorization');
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length);
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'no token,authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token not valid' });
  }
};