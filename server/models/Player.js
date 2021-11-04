const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PlayerSchema = new Schema({
    playerId: {
        type: Number,
        required: true,
        unique: true
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: 'activities'
    }
})

module.exports = mongoose.model('players', PlayerSchema);