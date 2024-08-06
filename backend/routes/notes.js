const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authorize = require('../middleware/authorize');
const {
  getNotes, addNewNote, updateNote, deleteNote,
} = require('../controllers/notesController');

// base route
router.get('/', authorize, getNotes);

// add new note
router.post('/', [
  body('title', '10 < Title Length < 20').isLength({ min: 10, max: 20 }),
  body('description', 'Description should be greate than 10 characters').isLength({ min: 10 }),
], authorize, addNewNote);

// to delete a note
router.delete('/:id', authorize, deleteNote);

// to update a note
router.put('/:id', authorize, updateNote);

module.exports = router;
