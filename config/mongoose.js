const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('MongoDB connected!'));

module.exports = db;