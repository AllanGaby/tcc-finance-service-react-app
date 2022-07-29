import { FinanceAccountType } from '../../../domain/finance'

export const FinanceAccountDescriptionType: Object = {
  [FinanceAccountType.Banking]: 'Conta bancária',
  [FinanceAccountType.Benefit]: 'Cartão de benefício',
  [FinanceAccountType.Bill]: 'Carteira',
  [FinanceAccountType.CreditCard]: 'Cartão de crédito'
}
