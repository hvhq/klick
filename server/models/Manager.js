const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ManagerSchema = new Schema({
    managerId: {
        type: Number,
        unique: true
    },
    username : {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('manager', ManagerSchema);