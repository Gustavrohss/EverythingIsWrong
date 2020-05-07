import styled from 'styled-components';

const DivBox = styled.div`
  display:flex;
  flex-direction:${props => props.column ? "column" : "row"};
  flex: 1;
  overflow-y: auto;
  margin: 5px 5px 5px 5px;
  align-items: center;
  justify-content: center;

  @media (min-width:900px) {
    margin: 25px 70px 25px 70px;
    overflow: hidden;
  }
`

export default DivBox