export class ConflictError extends Error {
  constructor (entity: string) {
    super(`Conflict with ${entity}`)
    this.name = 'ConflictError'
  }
}
