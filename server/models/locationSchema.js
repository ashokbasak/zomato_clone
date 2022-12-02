const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const LocationSchema = new Schema({
    locationId: {
        type: Number,
        
    },
    location: {
        type: String,
       
    },
   
})

module.exports = mongoose.model('Location', LocationSchema); 