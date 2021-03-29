const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    for: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema);