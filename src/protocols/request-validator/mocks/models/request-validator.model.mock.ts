import { RequestValidatorModel } from '@/protocols/request-validator'
import { random, database } from 'faker'

export const mockRequestValidatorModel = (): RequestValidatorModel => ({
  path: database.column(),
  message: random.words()
})
