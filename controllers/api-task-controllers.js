const Task = require('../models/task'); 

const getTasks = (req, res) => {
    Task 
      .find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => handleError(res, error));
    };
  
  const getTask = (req, res) => {
    Task
      .findById(req.params.id)
      .then((task) => res.status(200).json(task))
      .catch((error) => handleError(res, error));
  };

  module.exports = {
    getTasks,
    getTask
};
  