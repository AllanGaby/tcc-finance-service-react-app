import { InputMaskProtocol } from '@/protocols/input-mask'
import { datatype } from 'faker'

export class InputMaskProtocolSpy implements InputMaskProtocol {
  value: string
  maskedValue: string = datatype.uuid()

  mask (value: string): string {
    this.value = value
    return this.maskedValue
  }
}
