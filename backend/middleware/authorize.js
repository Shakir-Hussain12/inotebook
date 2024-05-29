const jwt = require('jsonwebtoken');

// extracting user from token
const authorize = (req, res, next) => {
  const authHeader = req.cookies['token'] ;
  if (!authHeader) {
    return res.status(401).send('Unauthorized Access');
  }

  try {
    const payload = jwt.verify(authHeader, process.env.SECRET_KEY);
    req.user = payload.user;
    next();
    return 1;
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};

module.exports = authorize;
