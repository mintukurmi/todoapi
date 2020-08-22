const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Object
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);


module.exports = Todo