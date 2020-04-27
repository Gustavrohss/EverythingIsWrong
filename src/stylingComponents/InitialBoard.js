import styled from 'styled-components';
const temp = (size, width = 1440) => `${(size / width) * 100}vw`;


const DivBox = styled.div`
  background-attachment: fixed;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fixed;
  background: linear-gradient(grey, lightblue);
  /*background-image:  url(https://picsum.photos/200/300/);*/
  background-size: cover;
  background: opacity(0.2);

  * {
    margin: 5px;
    padding: 5px;
    box-sizing: border-box;
  }
  :root {
      font-size: ${temp(24)};

      @media (min-width: 468) {
        font-size: ${temp(18)};
      }

      @media (min-width: 1024px) {
        font-size: ${temp(16)};
      }
    }
`;



export default DivBox