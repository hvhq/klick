const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VariableSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('variables', VariableSchema);