const mongoose = require('mongoose');

let isConnected = false;

async function connectToDb() {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    const dbUri = process.env.DB_CONNECT || 'mongodb://127.0.0.1:27017/myride';

    try {
        await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 5000
        });
        isConnected = true;
        console.log('Connected to MongoDB database successfully.');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        throw err;
    }
}

module.exports = connectToDb;