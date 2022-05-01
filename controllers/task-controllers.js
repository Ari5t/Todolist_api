const Task = require('../models/task');
const createPath = require('../helpers/create-path');

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

const updateGetTask = (req, res) =>{
    const id = req.params.id;
    Task.find({}, (err, tasks) => {
    res.render("edit.ejs", { tasks: tasks, idTask: id });
    });
};

const updatePostTask = (req, res) => {
    const id = req.params.id;
      Task.findByIdAndUpdate(id, { text: req.body.text }, err => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
};

const deleteTask = (req, res) =>{
    const id = req.params.id;
    Task.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
  });
};

module.exports = {
    getTask,
    postTask,
    updateGetTask,
    updatePostTask,
    deleteTask
};