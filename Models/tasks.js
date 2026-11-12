const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLength: 30
    },
    Description:{
        type: String,
    },
    Subject:{
        type: String,
        required: true
    },
    Priority:{
        type: String,
        enum: ["low","medium","high"],
        required: true
    },
    Due_date:{
        type: Date,
        required: true
    },
    Status:{
        type: String,
        enum: ["Pending","Completed"],
        required: true
    }
});

const Task = mongoose.model("Task",taskSchema);

module.exports = Task ;