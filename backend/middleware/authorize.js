const jwt = require('jsonwebtoken');

// extracting user from token
const authorize = (req, res, next ) => {
    console.log(req);
    next();
}

module.exports = authorize;