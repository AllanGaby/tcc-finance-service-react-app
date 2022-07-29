import { BarChartProps } from '../../../'
import { mockBarChartLegendItemProps } from '../../../../components/bar-chart/components/bar-chart-legend/mocks'
import { datatype } from 'faker'

export const mockBarChartProps = (data: any[] = []): BarChartProps => ({
  data,
  xAxisKey: datatype.uuid(),
  height: datatype.number(),
  legends: [mockBarChartLegendItemProps(), mockBarChartLegendItemProps(), mockBarChartLegendItemProps()],
  total: String(datatype.number()),
  width: datatype.number(),
  isCurrencyValue: datatype.boolean(),
  onChangeParams: () => { return undefined }
})
