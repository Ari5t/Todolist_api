import { Router } from 'express'
import APITaskController from '../controllers/APITaskController'
import { body, param } from 'express-validator';

import { APIErrorHandler } from '../errors/api-error'

export default Router()
    .get('/api/tasks', APITaskController.getTasks)
    .get('/api/task/:id', APITaskController.getTask)
    .post('/api/task', body('text').isLength({ min: 1 }), APITaskController.postTask)
    .put('/api/task/:id', body('text').isLength({ min: 1 }), APITaskController.updateTask)
    .delete("/api/task/:id", APITaskController.deleteTask)
    .use(APIErrorHandler)