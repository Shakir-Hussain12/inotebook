require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();
const authorize = require('../middleware/authorize');

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
    return res.status(400).json({ err: err.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'No such user exists' });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// sign-up route
router.post('/createuser', [
  body('name', 'Invalid Name').isLength({ min: 3, max: 15 }),
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Invalid Password').isLength({ min: 6 }),
], async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
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

      const payload = {
        user: {
          id: user.id,
        },
      };
  
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      res.json({ response: 'User created successfully!', token });

    } else {
      res.json({ response: "Couldn't create user", error: 'Email already in use' });
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// get Details of current user
router.post('/getuser', authorize, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    
    if(!user) {
      return res.status(400).json({ error: 'No such user exists' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
