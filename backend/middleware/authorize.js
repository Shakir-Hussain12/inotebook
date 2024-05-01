const jwt = require('jsonwebtoken');

// extracting user from token
const authorize = (req, res, next) => {
  const token = req.header('auth-token');
  
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload.user;
    next();
    return 1;
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};

module.exports = authorize;
