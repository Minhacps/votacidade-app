import styled from 'styled-components';
import colors from 'styles/colors';

export const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

export const Divider = styled.hr`
  border-top: 1px solid ${colors.grey400};
`;

export const StyledSpan = styled.span`
  font-size: 10pt;
  color: #707070;
  display: block;
  text-align: center;
  margin: 15px 0px 25px;

  button {
    color: ${colors.purple};
    font-weight: 500;
    border: none;
    background: transparent;
    padding: 0;
  }
`;

export const AnonymousWarning = styled.div`
  max-width: 500px;

  p {
    margin: 0;
  }
`;
