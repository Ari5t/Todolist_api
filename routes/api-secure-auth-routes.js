const express = require('express');

const router = express.Router();

const {
  profile,
  postTask,
  updateTask,
  deleteTask
} = require('../controllers/api-secure-auth-controllers');

router.get('/profile', profile);

//post
router.post('/task', postTask);

//update
router.put('/task/:id', updateTask);

//delete
router.delete("/task/:id", deleteTask);

module.exports = router;