import { MapFilterToURLParamsUseCase, ListEntitiesDTO } from '../../../../domain/common'

export class MemoryMapFilterToURLParamsUseCase implements MapFilterToURLParamsUseCase {
  private urlParams: string = ''

  private addUrlParams (field: string, value: string): void {
    if (value) {
      this.urlParams = `${this.urlParams}${this.urlParams ? '&' : ''}${field}=${value}`
    }
  }

  map (filter: ListEntitiesDTO = {}): string {
    this.urlParams = ''
    const { textToSearch, orderColumn, orderDirection, recordsPerPage, page, filters, complete } = filter
    this.addUrlParams('search', textToSearch)
    this.addUrlParams('order', orderColumn)
    this.addUrlParams('direction', orderDirection)
    this.addUrlParams('size', recordsPerPage?.toString())
    this.addUrlParams('page', page?.toString())
    if (complete) {
      this.addUrlParams('complete', 'true')
    }
    filters?.filter(item => Boolean(item)).forEach(item => {
      const { field, conditional, value, operator } = item
      this.addUrlParams('field', field)
      this.addUrlParams('condicional', conditional)
      this.addUrlParams('value', value?.toString())
      this.addUrlParams('operator', operator)
    })
    if (this.urlParams) {
      return `?${this.urlParams}`
    }
    return ''
  }
}
