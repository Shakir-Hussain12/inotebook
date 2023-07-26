const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const {body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.send("notes page");
});

router.post('/', [
    body('title').isLength({ min: 6, max: 20}),
    body('description').isLength({ min:10, max: 100 })
], (req, res) => {
    const errs = validationResult(req.body);
    if (!errs.isEmpty()) {
        return res.status(400).json({ errs: errs.array() });
    } else {
        try {
            Note.create(req.body)
            .then((note) => res.json({ response: "Note created successfully!", content: note }))
            .catch((err) => res.json({ response: "Couldn't create note", err: err.message }))
        } catch (err) {
            res.send(err.message);
        }
    }
});

module.exports = router;