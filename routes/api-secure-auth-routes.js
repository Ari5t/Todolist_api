const express = require('express');

const router = express.Router();

const {
  profile,
  getTask,
  getTasks,
  postTask,
  updateTask,
  deleteTask
} = require('../controllers/api-secure-auth-controllers');

router.get('/profile', profile);

//get tasks
router.get('/tasks', getTasks);

//get task
router.get('/task/:id', getTask);

//post
router.post('/task', postTask);

//update
router.put('/task/:id', updateTask);

//delete
router.delete("/task/:id", deleteTask);

module.exports = router;