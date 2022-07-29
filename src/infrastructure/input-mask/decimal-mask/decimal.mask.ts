import { InputMaskProtocol } from '../../../protocols/input-mask'

export type DecimaMaskProps = {
  digits?: number
  maxLength?: number
  min?: number
  max?: number
}

export class DecimalMask implements InputMaskProtocol {
  constructor (
    private readonly props: DecimaMaskProps
  ) {}

  mask (value: string): string {
    const digits = this.props?.digits || 2
    const maxLength = this.props?.maxLength || 10
    const max = this.props?.max || 9999999999
    const min = this.props?.min || 0
    let newValue = value
    if (value.replace(',', '').replace(/\./g, '').length > maxLength) {
      newValue = value.substring(0, value.length - 1)
    }
    const decimalPlace = maxLength ? maxLength - digits : value.replace(',', '').replace(/\./g, '').length - digits
    const rule = new RegExp(`(\\d)(\\d{${decimalPlace}})$`)
    newValue = newValue.replace(/\D/g, '')
    newValue = newValue.replace(rule, '$1,$2')

    if (!newValue) {
      newValue = '0,00'
    }
    if ((min) && (Number(newValue.replace(',', '.')) < min)) {
      newValue = String(min.toFixed(2).replace('.', ','))
    }
    if ((max) && (Number(newValue.replace(',', '.')) > max)) {
      newValue = String(max.toFixed(2).replace('.', ','))
    }
    return newValue
  }
}
