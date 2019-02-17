// Mongoose model of our example to do 
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, // validator
        minlength: 1, // validator
        trim: true // remove all leading and trailing spaces 
    },
    completed: {
        type: Boolean,
        default: false,

    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};