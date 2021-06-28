const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    dueDate: Date

})


const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;