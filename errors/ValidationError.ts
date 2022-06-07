import { NextFunction, Request, Response } from "express"

import { validationResult } from "express-validator"

export class ValidationError {
  handleError(req: Request, res: Response, next: NextFunction): unknown {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    return next()
  }
}

export default new ValidationError()