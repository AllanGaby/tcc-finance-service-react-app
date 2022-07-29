import { FinanceTransactionType } from '../../../domain/finance'

export const FinanceTransactionDescriptionType: Object = {
  [FinanceTransactionType.Credit]: 'Crédito',
  [FinanceTransactionType.Debit]: 'Débito'
}
