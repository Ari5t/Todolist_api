import Validator from './Validator'

class APITaskValidator extends Validator {
  public entity() {
    return super.schema({
      text: {
        isLength: {
          errorMessage: 'text should be at least 1 chars long',
          options: { min: 1 },
        },
      },
    })
  }
}

export default new APITaskValidator()