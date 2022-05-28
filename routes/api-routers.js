import { Router } from 'express'
import APITaskController from '../controllers/APITaskController'

import { APIErrorHandler } from '../errors'

export default Router()
    .get('/api/tasks', APITaskController.getTasks)
    .get('/api/task/:id', APITaskController.getTask)
    .post('/api/task', APITaskController.postTask)
    .put('/api/task/:id', APITaskController.updateTask)
    .delete("/api/task/:id", APITaskController.deleteTask)
    .use(APIErrorHandler)