const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RelaySchema = new Schema({
    pumpOn: {
      type: Boolean, default: false 
    },
    autoPumpOn: {
      type: Boolean, default: false 
    },
    time: {
      type: Date, default: Date.now
    }
})

module.exports = mongoose.model('Relay', RelaySchema);