const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RelaySchema = new Schema({
    pumpOn: {
      type: String, default: "OFF" 
    },
    autoPumpOn: {
      type: String, default: "OFF" 
    },
    time: {
      type: Date, default: Date.now
    }
})

module.exports = mongoose.model('Relay', RelaySchema);