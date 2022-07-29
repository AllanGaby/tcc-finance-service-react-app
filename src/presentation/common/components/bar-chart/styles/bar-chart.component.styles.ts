import styled from 'styled-components'

export const BarChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: 'white';
  margin-top: 12px;
  margin-bottom: 32px;

  strong {
    font-weight: bold;
    font-size: 28px;
    line-height: 32px;
    color: 'black';
  }
`

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;    
  align-items: center;
  justify-content: center;    
`

export const RechartsBarChartContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: auto;
  width: 100%;
  align-self: flex-start;
`
