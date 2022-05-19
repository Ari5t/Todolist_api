const Task = require('../models/task'); 


const profile = (req, res, next) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
};

const handleError = (res, error) => {
    res.status(500).send(error.message);
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
    profile,
    postTask,
    updateTask,
    deleteTask
};