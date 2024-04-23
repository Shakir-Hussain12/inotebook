const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

const router = express.Router();
const authorize = require('../middleware/authorize');

// base route
router.get('/', authorize, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }) || [];
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// add new note
router.post('/', [
  body('title', '10 < Title Length < 20').isLength({ min: 10, max: 20 }),
  body('description', 'Description should be greate than 10 characters').isLength({ min: 10 }),
], authorize, async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errs: err.array() });
  }

  try {
    await Note.create({
      user: req.user.id,
      ...req.body,
    });
    return res.status(200).send('Note Created');
  } catch (err) {
    return res.status(500).Json({ Error: 'Internal Server Error' });
  }
});

// to delete a note
router.delete('/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ user: req.user?.id, _id: id });
    if (!note) {
      return res.status(404).send('Note Not Found');
    }

    await Note.deleteOne({ user: req.user?.id, _id: id });
    return res.status(200).send('Note Deleted');
  } catch (err) {
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
});

// to update a note
router.put('/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ user: req.user?.id, _id: id });
    if (!note) {
      return res.status(404).send('Note Not Found');
    }

    await Note.findOneAndUpdate({ user: req.user?.id, _id: id }, req.body);
    return res.status(200).send('Note Updated');
  } catch (err) {
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
});

module.exports = router;
