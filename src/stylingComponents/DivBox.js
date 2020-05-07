import styled from 'styled-components';

const DivBox = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 25px 70px 5px 70px;
  align-items: center;
  justify-content: center;

  @media (min-width:500px) {
    display:flex;
    flex-direction:${props => props.column ? "column" : "row"};
    flex: 1;
    overflow: hidden;
  }
`

export default DivBox