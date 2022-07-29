import { FinanceTransactionType } from '../../../../domain/finance'
import { random } from 'faker'

export const mockFinanceTransactionType = (): FinanceTransactionType =>
  random.arrayElement(Object.values(FinanceTransactionType))
