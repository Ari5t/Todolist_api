import { Router } from 'express'
import APITaskController from '../../controllers/APITaskController'

import APITaskValidator from '../../middleware/APITaskValidator'

export default Router()
  .get('/:id', APITaskController.getTask)
  .post(
    '/',
    [
      APITaskValidator.entity(),
    ],
    APITaskController.postTask
  )
  .put(
    '/:id',
    [
      APITaskValidator.entity(),
    ],
    APITaskController.updateTask
  )
  .delete("/:id", APITaskController.deleteTask)
  .get('/', APITaskController.getTasks)