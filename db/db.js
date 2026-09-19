const mongoose = require('mongoose');

function connectToDb() {
    const dbUri = process.env.DB_CONNECT || 'mongodb://127.0.0.1:27017/myride';
    mongoose.connect(dbUri)
        .then(() => {
            console.log('Connected to MongoDB database successfully.');
        })
        .catch(err => {
            console.error('MongoDB connection error:', err.message);
        });
}

module.exports = connectToDb;