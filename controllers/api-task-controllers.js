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

const postTask = async(req, res) =>{
    try{
        const { text } = req.body;
        const task = new Task({ text });
        const id = task._id

        if (text <= 0){throw new Error("Заполните поле с текстом");}

        req.app.get('io').sockets.emit('task:created', { id, text })

        await task.save()

        res.status(200).json(task)

        
    }catch(error) {
        handleError(res, error)
    }
    
};

const updateTask = async(req, res) => {
    try{
        const { text } = req.body;
        const id = req.params.id;

        if (text <= 0){throw new Error("Заполните поле с текстом");}

        req.app.get('io').sockets.emit('task:updated', { id, text })
        await Task.findByIdAndUpdate(id, { text }, { new: true })
            .then((task) => res.status(200).json(task))

    }catch(error) {
        handleError(res, error)
    }
};

const deleteTask = async(req, res) =>{
    try{
        const id = req.params.id;

        req.app.get('io').sockets.emit('task:deleted', {id})
        await Task.findByIdAndDelete(id)

        res.status(200).json(req.params.id)
    }catch(error) {
        handleError(res, error)
    }
};

module.exports = {
    getTasks,
    getTask,
    postTask,
    updateTask,
    deleteTask
};