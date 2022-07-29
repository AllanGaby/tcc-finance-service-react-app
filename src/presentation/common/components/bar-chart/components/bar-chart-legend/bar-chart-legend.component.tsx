import React, { useCallback } from 'react'
import { BarChartLegendProps, BarChartLegendItemProps } from '../../../'
import { BarLegendCircle, BarLegendText } from '../../../../components/bar-chart/components/bar-chart-legend/styles'

export const BarChartLegend: React.FC<BarChartLegendProps> = ({ barLegends }) => {
  const handleLegend = useCallback((barLegend: BarChartLegendItemProps) =>
    <>
      <BarLegendCircle color={barLegend.color || 'blue'} data-testid={`bar-legend-circle-${barLegend.text}`} />
      <BarLegendText data-testid={`bar-legend-text-${barLegend.text}`}>{barLegend.text}</BarLegendText>
    </>
  , [])

  return (
    <>
      {barLegends.map(barLegend => (
        <React.Fragment key={barLegend.text}>
          {handleLegend(barLegend)}
        </React.Fragment>
      ))}
    </>
  )
}
