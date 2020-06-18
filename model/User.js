const mongoose = require('mongoose');

const schema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    blogs: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Users', schema);