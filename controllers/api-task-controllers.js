const Task = require('../models/task'); 

const handleError = (res, error) => {
    res.status(500).send(error.message);
};

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

const postTask = (req, res) =>{
    const { text } = req.body;
    const task = new Task({ text });
    task
      .save()
      .then((task) => res.status(200).json(task))
      .catch((error) => handleError(res, error));
};

const updateTask = (req, res) => {
    const { text } = req.body;
    Task
        .findByIdAndUpdate(req.params.id, { text }, { new: true })
        .then((task) => res.status(200).json(task))
        .catch((error) => handleError(res, error));
};

const deleteTask = (req, res) =>{
    Task
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => handleError(res, error));
};

module.exports = {
    getTasks,
    getTask,
    postTask,
    updateTask,
    deleteTask
};