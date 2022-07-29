import { InputMaskType } from '../../infrastructure/input-mask'
import { InputMaskProtocol } from '../../protocols/input-mask'
import { CurrencyMask, CurrencyMaskProps } from './currency-mask'
import { DecimalMask, DecimaMaskProps } from './decimal-mask'

export type InputMaskProps =
CurrencyMaskProps &
DecimaMaskProps

export class InputMaskFactory {
  public static GetInputMaskAdaper (type: InputMaskType, props?: InputMaskProps): InputMaskProtocol {
    switch (type) {
      case InputMaskType.Currency:
        return new CurrencyMask(props)
      case InputMaskType.Decimal:
        return new DecimalMask(props)
      default:
        return undefined
    }
  }
}
