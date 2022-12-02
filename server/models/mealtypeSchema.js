const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const MealTypeSchema = new Schema({
    mealtype: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    mealtypeId: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('MealType', MealTypeSchema); 