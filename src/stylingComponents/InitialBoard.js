import styled from 'styled-components';


const DivBox = styled.div`
  background-attachment: fixed;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: flex;
  background: linear-gradient(grey, lightblue);
  /*background-image:  url(https://picsum.photos/200/300/);*/
  background-size: cover;
  background: opacity(0.2);

  padding: 150px;
  border: 1px solid rgba(1, 0, 0, 0.1);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`


export default DivBox