const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activityId: {
        type: Number,
        required: true,
        unique:true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
})

module.exports = mongoose.model('activities', activitySchema);