const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: String,
  userId: String,
});

module.exports = mongoose.model('Token', tokenSchema);
