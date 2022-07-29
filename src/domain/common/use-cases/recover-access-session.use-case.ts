import { AccessSessionModel } from '../../../domain/common'

export interface RecoverAccessSessionUseCase {
  recoverAccessSession: () => Promise<AccessSessionModel>
}
