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
    pumpOn: {
      type: String
    },
    autoPumpOn: {
      type: String
    },
    ruleFuzzyTemp: {
      type: String
    },
    ruleFuzzyHum: {
      type: String
    },
    ruleFuzzyWater: {
      type: String
    },
    targetSoil: {
      type: Number
    }
})

DataSchema.set('timestamps', true);
module.exports = mongoose.model('Data', DataSchema);
