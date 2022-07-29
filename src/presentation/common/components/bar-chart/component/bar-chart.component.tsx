import React, { useMemo, useRef, useCallback } from 'react'
import { Bar, CartesianGrid, Tooltip, XAxis, YAxis, BarChart as RechartsBarChart } from 'recharts'
import {
  BarChartProps,
  barChartAxisConstants,
  BarChartLegend,
  barChartBarConstants,
  ColorMode
} from '../../../../common'
import { BarChartContainer, BarChartHeader, RechartsBarChartContainer } from '../../../../common/components/bar-chart/styles'
import { useColorMode } from '@chakra-ui/react'

export const BarChart: React.FC<BarChartProps> = ({
  data,
  legends,
  total,
  width,
  height,
  xAxisKey,
  onChangeParams,
  isCurrencyValue = false
}: BarChartProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { colorMode } = useColorMode()
  const baseColor = colorMode === ColorMode.Dark ? 'white' : 'black'
  const { tickLine, tick } = barChartAxisConstants(baseColor)

  const handleGetMaxValue = useCallback(() => {
    if (data.length === 0) {
      return 0
    }
    const maxValuePerKey: number[] = []
    const keys = Object.keys(data[0])
    keys.filter(key => key !== xAxisKey).forEach(key => maxValuePerKey.push(Math.max.apply(null, data.map(dataItem => dataItem[key]))))
    return Math.max.apply(null, maxValuePerKey)
  }, [data, xAxisKey, legends])

  const handleValueFormatter = useCallback((value: string) => isCurrencyValue ? Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : value, [isCurrencyValue])

  const handleChartBars = useMemo(() =>
    legends.map((item, index) =>
      <Bar
        key={index}
        name={item.text}
        dataKey={item.key}
        fill={item.color || baseColor}
        barSize={barChartBarConstants.barSize}
        radius={barChartBarConstants.radius} />)
  , [legends])

  const handleXAxis = useMemo(() =>
    <XAxis
      tickLine={tickLine}
      axisLine={tickLine}
      tick={tick}
      dataKey={xAxisKey}/>
  , [data])

  const handleYAxis = useMemo(() => {
    const maxValue = handleGetMaxValue()
    return (
      <YAxis
        tickLine={tickLine}
        axisLine={tickLine}
        tick={tick}
        width={100}
        tickFormatter={handleValueFormatter}
        domain={[0, maxValue]}
        ticks={maxValue >= 4 ? Array.from({ length: 5 }, (_, index) => index * Math.ceil((maxValue / 4))) : [0, maxValue]}
      />
    )
  }, [data])

  const handleChart = useMemo(() =>
    <RechartsBarChartContainer>
      <RechartsBarChart
        width={width | cardRef?.current?.offsetWidth}
        height={height}
        data={data}
        barSize={50}
        margin={{ bottom: 24, top: 0, left: 0, right: 0 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={baseColor} strokeWidth={1} verticalPoints={[0]} />
        {handleXAxis}
        {handleYAxis}
        <Tooltip isAnimationActive={false} formatter={handleValueFormatter}/>
        {handleChartBars}
      </RechartsBarChart>
    </RechartsBarChartContainer>
  , [data, cardRef, isCurrencyValue])

  const handleChartLegends = useMemo(() =>
    <BarChartLegend barLegends={legends}/>
  , [legends])

  return (
    <BarChartContainer>
      <BarChartHeader ref={cardRef} data-testid="bar-chart-container-row">
        <strong data-testid="bar-chart-total-text">{total}</strong>
      </BarChartHeader>
      {handleChart}
      {handleChartLegends}
    </BarChartContainer>
  )
}
