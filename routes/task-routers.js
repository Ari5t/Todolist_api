const express = require('express');
const { 
    getTask,
    postTask,
    updateGetTask,
    updateTask,
    deleteTask,
} = require('../controllers/task-controllers');

const router = express.Router(); 

//get
router.get('/', getTask);

//post
router.post('/', postTask);

//get update
router.get('/edit/:id', updateGetTask);

//update
router.put('/edit/:id', updateTask);

//delete
router.delete("/:id", deleteTask);

module.exports = router;  