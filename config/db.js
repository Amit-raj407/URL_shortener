const mongoose = require('mongoose');
const config = require('./config');


require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // console.log(process.env.MONGO_URI);
        console.log("Connected to mongoDB cloud cluster");
    } catch (err) {
        console.error(err.message);
    }
};


module.exports = connectDB;