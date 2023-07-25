const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';

const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Database");
    } catch (err) {
        console.error("Couldn't connect to MongoDB Database: ", err);
    }
}

module.exports = connectDB;