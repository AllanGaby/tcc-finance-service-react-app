import { CreateAccessSessionDTO } from '../../../../domain/common'
import { internet } from 'faker'

export const mockCreateAccessSessionDTO = (): CreateAccessSessionDTO => ({
  login: internet.email(),
  password: internet.password()
})
