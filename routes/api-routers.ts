import { Router } from 'express'
import APITaskController from '../controllers/APITaskController'

import { APIErrorHandler } from '../errors/api-error'
import ApiValidator from '../middleware/api-validator'

export default Router()
    .get('/api/tasks', APITaskController.getTasks)
    .get('/api/task/:id', APITaskController.getTask)
    .post('/api/task', ApiValidator.schem(), APITaskController.postTask)
    .put('/api/task/:id', ApiValidator.schem(), APITaskController.updateTask)
    .delete("/api/task/:id", APITaskController.deleteTask)
    .use(APIErrorHandler)