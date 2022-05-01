const express = require('express');
const { 
    getTask,
    postTask,
    updateGetTask,
    updatePostTask,
    deleteTask
} = require('../controllers/task-controllers');

const router = express.Router(); 

//get
router.get('/', getTask);

//post
router.post('/', postTask);

//update
router
  .route("/edit/:id")
  .get(updateGetTask)
  .post(updatePostTask);

//delete
router.route("/remove/:id").get(deleteTask);

module.exports = router;  