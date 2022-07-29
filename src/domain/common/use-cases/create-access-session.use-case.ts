import { AccessSessionModel, CreateAccessSessionDTO } from '../../../domain/common'

export interface CreateAccessSessionUseCase {
  createAccessSession: (params: CreateAccessSessionDTO) => Promise<AccessSessionModel>
}
