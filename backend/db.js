/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = `mongodb://${process.env.NAME}:27017/inotebook?directConnection=true&appName=mongosh+1.10.1`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Database');
  } catch (err) {
    console.error("Couldn't connect to MongoDB Database: ", err);
  }
};

module.exports = connectDB;
