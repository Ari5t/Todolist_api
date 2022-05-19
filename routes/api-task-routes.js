const express = require('express');

const router = express.Router();

const {
    getTask,
    getTasks
  } = require('../controllers/api-task-controllers');

//get tasks
router.get('/tasks', getTasks);

//get task
router.get('/task/:id', getTask);

module.exports = router;