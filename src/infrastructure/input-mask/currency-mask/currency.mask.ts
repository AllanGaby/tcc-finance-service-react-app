import { InputMaskProtocol } from '../../../protocols/input-mask'

export type CurrencyMaskProps = {
  maxLength?: number
  prefix?: string
  min?: number
  max?: number
}

export class CurrencyMask implements InputMaskProtocol {
  constructor (private readonly props: CurrencyMaskProps) {}

  mask (value: string): string {
    const prefix = this.props?.prefix || 'R$'
    const maxLength = this.props?.maxLength || 10
    const min = this.props?.min || 0
    const max = this.props?.max || 9999999999
    let newValue = value
    if (value.replace(',', '').replace(/\./g, '').replace(prefix, '').length > maxLength) {
      newValue = value.substring(0, value.length - 1)
    }
    newValue = newValue.replace(/\D/g, '')
    newValue = newValue.replace(/(\d)(\d{2})$/, '$1,$2')
    newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, '.')
    if (!newValue) {
      newValue = '0,00'
    }
    if ((min) && (Number(newValue.replace(',', '.')) < min)) {
      newValue = String(min.toFixed(2).replace('.', ','))
    }
    if ((max) && (Number(newValue.replace(',', '.')) > max)) {
      newValue = String(max.toFixed(2).replace('.', ','))
    }
    return newValue ? prefix + newValue : newValue
  }
}
