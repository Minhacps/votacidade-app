import styled from 'styled-components';
import colors from 'styles/colors';

export const Label = styled.p`
  color: ${colors.grey500};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.grey300};
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const IconButton = styled.div`
  width: 35px;
  height: 35px;
  display: inline-block;
  margin-right: 15px;

  &:last-child: {
    margin-right: 0;
  }

  & button {
    background: none;
    border: 0;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const WhatsAppButton = styled(IconButton)`
  @media (min-width: 500px) {
    display: none;
  }
`;
