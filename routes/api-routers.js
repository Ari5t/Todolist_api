const express = require('express');
const {
    getTask,
    getTasks,
    postTask,
    updateTask,
    deleteTask
} = require('../controllers/api-task-controllers');

const router = express.Router(); 

//get tasks
router.get('/api/tasks', getTasks);

//get task
router.get('/api/task/:id', getTask);

//post
router.post('/api/task', postTask);

//update
router.put('/api/task/:id', updateTask);

//delete
router.delete("/api/task/:id", deleteTask);

module.exports = router;  