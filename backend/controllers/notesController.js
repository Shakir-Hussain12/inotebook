const { validationResult } = require('express-validator');

const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }) || [];
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addNewNote = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errs: err.array() });
  }

  try {
    const note = await Note.create({
      user: req.user.id,
      ...req.body,
    });
    return res.status(200).json({ msg: 'Note Created', note });
  } catch (err) {
    return res.status(500).Json({ Error: 'Internal Server Error' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ user: req.user?.id, _id: id });
    if (!note) {
      return res.status(404).send('Note Not Found');
    }

    await Note.deleteOne({ user: req.user?.id, _id: id });
    return res.status(200).json({ msg: 'Note Deleted', note });
  } catch (err) {
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    let note = await Note.findOne({ user: req.user?.id, _id: id });
    if (!note) {
      return res.status(404).send('Note Not Found');
    }

    await Note.findOneAndUpdate({ user: req.user?.id, _id: id }, req.body);
    note = await Note.findOne({ user: req.user?.id, _id: id });
    return res.status(200).json({ msg: 'Note Updated', note });
  } catch (err) {
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
};
