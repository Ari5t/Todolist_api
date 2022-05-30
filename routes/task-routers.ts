import { Router } from 'express'
import TaskControllers from '../controllers/TaskControllers'

import { ErrorHandler } from '../errors/index'

export default Router()
    .get('/', TaskControllers.getTask)
    .post('/', TaskControllers.postTask)
    .get('/edit/:id', TaskControllers.updateGetTask)
    .put('/edit/:id', TaskControllers.updateTask)
    .delete("/:id", TaskControllers.deleteTask)
    .use(ErrorHandler)
