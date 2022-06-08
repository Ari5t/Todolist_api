import { Router } from 'express'

import { APIErrorHandler } from '../../errors/api-error'

import taskRouter from './task'

export default Router()
    .use('/tasks?', taskRouter)
    .use(APIErrorHandler)