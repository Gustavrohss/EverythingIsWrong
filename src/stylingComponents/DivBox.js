import styled from 'styled-components';

const DivBox = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 50px;
  align-items: center;
  justify-content: center;

  @media (min-width:500px) {
    display:flex;
    flex-direction:"row";
    flex: 1;
    width: 80%;
    overflow: hidden;
  }
`

export default DivBox