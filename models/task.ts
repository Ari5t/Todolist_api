import {Schema, model} from 'mongoose'

const taskSchema = new Schema({
    text: {
        type: String,
        required: true,
    }
});

const Task = model('Task', taskSchema )

export default Task