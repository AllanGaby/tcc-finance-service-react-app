import { JoiValidationAdapter } from './joi'
import { RequestValidatorProtocol } from '@/protocols/request-validator'

export class RequestValidatorFactory {
  public static GetRequestValidatorAdaper (): RequestValidatorProtocol {
    return new JoiValidationAdapter()
  }
}
