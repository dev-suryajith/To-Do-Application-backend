const tasks = require("../models/taskSchema")
const users = require("../models/userModel")

exports.addNewTask = async (req, res) => {
    console.log('Inside addNewTask')

    const { taskName, taskDescription, priority, dueDate } = req.body
    const userMail = req.payload

    try {
        const existingUser = await users.findOne({ email: userMail })
        if (!existingUser) {
            return res.status(404).json('User not found')
        }

        const existingTask = await tasks.findOne({ taskName, userMail })
        if (existingTask) {
            return res.status(400).json('Task already exists')
        }

        const newTask = new tasks({ taskName, taskDescription, priority, dueDate, userMail })

        await newTask.save()
        res.status(201).json(newTask)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.getAllTasks = async (req, res) => {
    const userMail = req.payload
    try {
        const existingUser = await users.findOne({ email: userMail })
        if (!existingUser) {
            return res.status(404).json('User not found')
        }

        const allTasks = await tasks.find({ userMail })
        if (allTasks.length == 0) {
            return res.status(400).json(['No tasks yet. Click “Add Task” to create your first one'])
        }
        if (allTasks) {
            return res.status(200).json(allTasks)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.updateTask = async (req, res) => {
    console.log('Inside updateTask');

    const { taskName, taskDescription, priority, dueDate, status } = req.body
    const userMail = req.payload
    console.log(userMail)
    try {
        const existingUser = await users.findOne({ email: userMail })
        if (!existingUser) {
            return res.status(404).json('User not found')
        }

        const updatedTask = await tasks.findOneAndUpdate({ taskName, userMail }, { taskName, taskDescription, priority, dueDate, userMail, status    }, { new: true })
        if (updatedTask) {
            res.status(201).json(updatedTask)
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params
    const userMail = req.payload

    try {
        const existingUser = await users.findOne({ email: userMail })
        if (!existingUser) {
            return res.status(404).json('User not found')
        }

        const deleteTask = await tasks.findByIdAndDelete({ _id: id })
        if (deleteTask) {
            res.status(201).json(deleteTask)
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

