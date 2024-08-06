require('dotenv').config();
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authorize = require('../middleware/authorize');
const refreshAuthorize = require('../middleware/refreshAuthorize');

const {
  login, createUser, getUser, getAllUsers, refreshToken, logout,
} = require('../controllers/authController');
// base route
router.get('/', getAllUsers);

// sign-up route
router.post('/createuser', [
  body('name', 'Name too short').isLength({ min: 6 }),
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Password too short').isLength({ min: 6 }),
], createUser);

// login route
router.post('/login', [
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Invalid Password').isLength({ min: 6 }),
], login);

// get Details of current user
router.post('/getuser', authorize, getUser);

// refresh Auth token
router.get('/refresh', refreshAuthorize, refreshToken);

// log out user
router.get('/logout', logout);

module.exports = router;
