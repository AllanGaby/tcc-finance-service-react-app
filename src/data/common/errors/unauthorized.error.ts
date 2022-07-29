export class UnauthorizedError extends Error {
  constructor (errors: object) {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
