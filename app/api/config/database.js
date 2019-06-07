//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://0.0.0.0:27017/tanidb';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
