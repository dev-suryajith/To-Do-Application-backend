const express = require("express");
const { registerUser, loginUser } = require("./controllers/authController");
const router = express.Router();
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const { addNewTask, getAllTasks, updateTask, deleteTask } = require("./controllers/taskController");

// --------- user ---------
router.post("/register", registerUser);
router.post("/login", loginUser);


// --------- tasks ---------
router.post('/addNewTask', jwtMiddleware, addNewTask)
router.get('/getAllTasks', jwtMiddleware, getAllTasks)
router.put('/updateTask', jwtMiddleware, updateTask)
router.delete('/deleteTask/:id', jwtMiddleware, deleteTask)

module.exports = router