import { body, checkSchema } from 'express-validator';


class ApiValidator{
  // Not schem
  public len(){
    return body('text').isLength({ min: 1 })
  }
  //checkSchema
  public schem(){
    return checkSchema({
      text: {
        isLength: {
          errorMessage: 'text should be at least 1 chars long',
          options: { min: 1 }
        }
      }
    })
  }
}


export default new ApiValidator