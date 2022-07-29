export class UnprocessableEntityError extends Error {
  constructor (errors: object) {
    super(`Unprocessable Entity: ${JSON.stringify(errors)}`)
    this.name = 'UnprocessableEntityError'
  }
}
