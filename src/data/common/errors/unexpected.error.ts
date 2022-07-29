export class UnexpectedError extends Error {
  constructor (error: object) {
    super(`Unexpected error: ${JSON.stringify(error)}`)
    this.name = 'UnexpectedError'
  }
}
