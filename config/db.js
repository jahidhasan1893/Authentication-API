require('dotenv').config();

const mongoose = require('mongoose');

function connectDB() {
    // Database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
        .then(() => {
            console.log('Database Connected!!');
        })
        .catch(err => {
            console.error('Connection failed.', err);
        });
}


module.exports = connectDB;