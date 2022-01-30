const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_URI;

/* Conexio a mongodb */
mongoose.connect(connectionString).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err.message);
});

process.on('unhandledRejection', () => {
    mongoose.disconnect();
});