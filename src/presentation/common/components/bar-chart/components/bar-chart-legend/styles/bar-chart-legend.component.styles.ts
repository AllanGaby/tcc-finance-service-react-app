import styled from 'styled-components'

type BarLegendCircleProps = {
  color: string
}

export const BarLegendCircle = styled.div<BarLegendCircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: 'white';
`

export const BarLegendText = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: 'black';
`
