export class EntityNotFoundError extends Error {
  constructor (entity: string) {
    super(`${entity} is not found`)
    this.name = 'EntityNotFoundError'
  }
}
