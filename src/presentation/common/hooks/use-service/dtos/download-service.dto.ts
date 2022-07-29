import { CommonServiceDTO } from '../../../../common/hooks'
import { HttpContentType } from '@/protocols/http-client'

export type DownloadServiceDTO = CommonServiceDTO & {
  entityId?: number
  contentType: HttpContentType
}
