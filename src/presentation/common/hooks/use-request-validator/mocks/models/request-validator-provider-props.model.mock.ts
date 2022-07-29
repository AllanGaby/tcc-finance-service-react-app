import { RequestValidatorSpy } from '../../../../../../protocols/request-validator'
import { RequestValidatorProviderProps } from '../../../'

export const mockRequestValidatorProviderProps = (): RequestValidatorProviderProps => ({
  requestValidator: new RequestValidatorSpy()
})
