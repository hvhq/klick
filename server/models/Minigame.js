const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MinigameSchema = new Schema(
    {
        minigameId :{
            type: Number,
            require: true,
            unique: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        activityId : {
            type : Schema.Types.ObjectId,
            ref : 'activities'
        }
    }
)

module.exports = mongoose.model('minigames', MinigameSchema);