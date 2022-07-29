import { MapFilterToURLParamsUseCase } from '../../../../../domain/common'
import { MemoryMapFilterToURLParamsUseCase } from '../../../../../data/common/use-cases'

export const makeMapFilterToURLParamsUseCase = (): MapFilterToURLParamsUseCase =>
  new MemoryMapFilterToURLParamsUseCase()
