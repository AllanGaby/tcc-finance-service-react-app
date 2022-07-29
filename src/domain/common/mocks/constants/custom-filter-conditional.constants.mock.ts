import { CustomFilterConditional } from '../../../../domain/common'
import { random } from 'faker'

export const mockCustomFilterConditional = (): CustomFilterConditional => random.arrayElement(Object.values(CustomFilterConditional))
