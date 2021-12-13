const mongoose = require('mongoose');



const TodoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    duedate: {
        type: Date,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    severity: {
        type: Number, min: 0, max: 5,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Todo', TodoSchema);