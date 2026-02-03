const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
            unique: true
        },
        taskDescription: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'Pending'
        },
        dueDate: {
            type: Date,
            required: true,
        },
        userMail: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const tasks = mongoose.model("tasks", taskSchema)
module.exports = tasks