import styled from 'styled-components'

export const HighScoreTable = styled.table`
font-family: cursive;
font-size: 24px;
border: 1px solid black;
`

export const TabRow = styled.tr`
border: 1px solid black;
`

export const TabData = styled.td`
width: ${props => props.width || 200}px;
`