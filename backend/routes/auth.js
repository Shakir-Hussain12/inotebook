const express =  require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(req.body);
})

router.post('/', [
    body('name', 'Invalid Name').isLength({ min: 6, max: 15 }),
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 6 })
], (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array() });
    } else {
        try {
            User.create(req.body)
            .then((user) => res.json({ response: "User created successfully!", content: user }))
            .catch((err) => res.send({ response: "Couldn't create user", err: err.message }))

        } catch (err) {
            res.err(err.message);
        }
    }
});

module.exports = router;