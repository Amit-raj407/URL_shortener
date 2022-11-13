// const mongoose = require('mongoose');
// const config = require('./config');


// require('dotenv').config();

// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         // console.log(process.env.MONGO_URI);
//         console.log("Connected to mongoDB cloud cluster");
//     } catch (err) {
//         console.error(err.message);
//     }
// };

const mysql = require('mysql')

const connectDB = async() => {
    const con = mysql.createConnection({
        host: "url-shortener-db.cw8p6keqgbly.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "12345678"
    });
    
    con.connect((err) => {
        if(err) {
            console.log("Could not Connect");
            throw err;
        }
        console.log("Connected");
        con.end();
    })
} 


module.exports = connectDB ;