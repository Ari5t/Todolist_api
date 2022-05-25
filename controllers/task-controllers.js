const Task = require('../models/task');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.send(`<p>${error.message}</p><pre>${error.stack}</pre>`)
};

const getTask = (req, res) => {
    Task 
    .find()
    .then((tasks) => res.render(createPath('index'), { tasks }))
    .catch((error) => {
        console.log(error);
        res.render(createPath('error'));
    })
};

const postTask = (req, res) =>{
    const { text } = req.body;
    const task = new Task({ text });
    task
      .save()
      .then((result) => res.redirect('/'))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'));
    })
};

const updateGetTask = (req, res) => {
    Task
    .findById(req.params.id)
    .then(tasks => res.render(createPath('edit'), {tasks}))
    .catch((error) => handleError(res, error));
};

const updateTask = async(req, res) => {

};

const deleteTask = (req, res) =>{
    
};

module.exports = {
    getTask,
    postTask,
    updateGetTask,
    updateTask,
    deleteTask
};