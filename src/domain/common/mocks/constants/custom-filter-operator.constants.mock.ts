import { CustomFilterOperator } from '../../../../domain/common'
import { random } from 'faker'

export const mockCustomFilterOperator = (): CustomFilterOperator => random.arrayElement(Object.values(CustomFilterOperator))
