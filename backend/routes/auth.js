const express =  require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        const data = {
            id: user[0].id
        }

        const token = jwt.sign(data, process.env.SECRET_KEY);
        console.log(token); 
        res.json(user);
    } catch (err) {
        res.json(err);
    }
})

router.post('/createuser', [
    body('name', 'Invalid Name').isLength({ min: 3, max: 15 }),
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 6 })
], async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array() });
    } else {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt);
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass
                })
                res.json({ response: "User created successfully!", content: user })
            } else {
                res.json({ response: "Couldn't create user", error: "Email already in use"});
            }
        } catch (err) {
            res.err(err.message);
        }
    }
});

module.exports = router;