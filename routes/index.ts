import { Router } from 'express'

import taskRouter from './task'
import apiRouter from './api'

export default Router()
  .use('/api', apiRouter)
  .use('/', taskRouter)