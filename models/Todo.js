const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    complete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);