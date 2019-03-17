const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DataSchema = new Schema({
    temp: {
      type: Number, required: true 
    },
    humidity: {
      type: Number, required: true 
    },
    soilMoisture: {
      type: Number, required: true 
    },
    waterVolume: { 
      type: Number, required: true
    },
    time: {
      type: Date, default: Date.now
    }
})

module.exports = mongoose.model('Data', DataSchema);