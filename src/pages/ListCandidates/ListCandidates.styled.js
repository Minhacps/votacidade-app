import styled from 'styled-components';
import colors from 'styles/colors';

export const PageTitle = styled.h2`
  color: ${colors.purple};
  font-size: 16pt;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 10pt;
`;

export const Divider = styled.hr`
  border-top: 1px solid ${colors.grey300};
`;

export const CandidateCard = styled.div`
  display: flex;
  align-items: center;
`;

export const Img = styled.img`
  margin-right: 15px;
  width: 73px;
  height: 73px;
  border-radius: 50%;
  background-color: ${colors.grey300};
`;

export const ImgPlaceholder = styled.div`
  margin-right: 15px;
  width: 73px;
  height: 73px;
  background-color: ${colors.grey300};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: 'FOTO';
    color: #fff;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 10pt;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CardName = styled.p`
  font-size: 13pt;
  font-weight: 500;
  margin-bottom: 0;
`;

export const CardInfo = styled.span`
  font-size: 12pt;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const AnswerTag = styled.span`
  color: #fff;
  background-color: ${colors.purple};
  border-radius: 11px;
  padding: 0 10px;
  display: inline-flex;
  justify-content: center;
`;
