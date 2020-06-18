const mongoose = require('mongoose');

const schema  = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog should have a title']
    },
    content: {
        type: String,
        required: [true, 'Blog should have a content']
    },
    images: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Blogs', schema);