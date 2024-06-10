require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Token = require('../models/Token');

const router = express.Router();
const authorize = require('../middleware/authorize');
const refreshAuthorize = require('../middleware/refreshAuthorize');

// base route
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// login route
router.post('/login', [
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Invalid Password').isLength({ min: 6 }),
], async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array()[0].msg });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: 'No such user exists' });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ err: "Password doesn't match" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY);

    const refToken = await Token.findOne({ userId: user.id });
    if (!refToken) {
      await Token.create({ userId: user.id, token: refreshToken });
    }

    if (refToken) {
      await Token.findOneAndUpdate({ userId: user.id }, { token: refreshToken });
    }

    res.cookie('token', accessToken, { httpOnly: true, domain: 'localhost', path: '/' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, domain: 'localhost', path: '/' });
    res.json({ accessToken, refreshToken });
    return res;
  } catch (err) {
    return res.status(500).json({ err: 'Internal Server Error' });
  }
});

// sign-up route
router.post('/createuser', [
  body('name', 'Name too short').isLength({ min: 6 }),
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Password too short').isLength({ min: 6 }),
], async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array()[0].msg });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      return res.json({ response: 'User created successfully!' });
    }
    return res.json({ response: "Couldn't create user", error: 'Email already in use' });
  } catch (err) {
    return res.status(500).json({ err: 'Internal Server Error' });
  }
});

// get Details of current user
router.post('/getuser', authorize, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select('-password');

    if (!user) {
      return res.status(400).json({ err: 'No such user exists' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.get('/refresh', refreshAuthorize, async (req, res) => {
  try {
    const accessToken = jwt.sign({ user: req.user }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', accessToken, { httpOnly: true, domain: 'localhost', path: '/' });
    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    return res.status(200).json({ response: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
module.exports = router;
