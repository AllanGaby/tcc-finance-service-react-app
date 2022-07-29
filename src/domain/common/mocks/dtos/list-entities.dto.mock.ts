import { ListEntitiesDTO, mockOrderDirection, mockCustomFilterModel } from '../../../../domain/common'
import { datatype } from 'faker'

export const mockListEntitiesDTO = (): ListEntitiesDTO => ({
  textToSearch: datatype.string(),
  recordsPerPage: datatype.number(),
  page: datatype.number(),
  orderColumn: datatype.string(),
  orderDirection: mockOrderDirection(),
  filters: [
    mockCustomFilterModel()
  ]
})
