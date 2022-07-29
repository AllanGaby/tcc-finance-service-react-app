import { OrderDirection } from '../../../../domain/common'
import { random } from 'faker'

export const mockOrderDirection = (): OrderDirection => random.arrayElement(Object.values(OrderDirection))
