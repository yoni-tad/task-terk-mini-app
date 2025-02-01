const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Shopping', 'Health', 'Others'],
        default: 'Others',
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Number,
        require: true
    }    
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);
