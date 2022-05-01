const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Task = require('./models/task.js');

const app = express();
const PORT = 3000;
const db = 'mongodb+srv://Yaroslav:qwerrewq@clus.mnkjs.mongodb.net/NodeTask?retryWrites=true&w=majority'

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false }));
app.use(express.static('styles'));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
  });

//post
app.post('/', (req, res) =>{
    const { text } = req.body;
    const task = new Task({ text });
    task
      .save()
      .then((result) => res.redirect('/'))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'));
    })
});

//get
app.get('/', (req, res) => {
    Task
    .find()
    .then((tasks) => res.render(createPath('index'), { tasks }))
    .catch((error) => {
        console.log(error);
        res.render(createPath('error'));
    })
});

//update
app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
      Task.find({}, (err, tasks) => {
      res.render("edit.ejs", { tasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
      Task.findByIdAndUpdate(id, { text: req.body.text }, err => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  });

//delete
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});
