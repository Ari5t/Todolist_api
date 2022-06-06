import { Router } from 'express'

import { checkSchema, Schema } from 'express-validator'

import { ValidationError } from '../errors/ValidationError'

abstract class Validator extends ValidationError {
  protected schema(schema: Schema) {
    return Router()
      .use(
        checkSchema(schema),

        this.handleError
      )
  }
}


export default Validator