//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://13.67.33.53:27017/tanidb';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;