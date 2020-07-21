import styled from 'styled-components';

const Background = styled.img`
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  @media screen and (min-width: 1200px) {
    width: 100%;
  }
`;

export default Background;
