import { SelectValue } from '../../../../common'
import { BarChartAvailableValueTypes } from '../../../../common/components/bar-chart/constants'

export const barChartValueTypeConstants: SelectValue[] = [{
  value: BarChartAvailableValueTypes.Value,
  label: BarChartAvailableValueTypes.Value
}, {
  value: BarChartAvailableValueTypes.Quantity,
  label: BarChartAvailableValueTypes.Quantity
}]
