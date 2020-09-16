import styled from 'styled-components';
import colors from 'styles/colors';

export const PageTitle = styled.h2`
  color: ${colors.purple};
  font-size: 16pt;
  margin-bottom: 10px;
`;

export const PageDescription = styled.p`
  font-size: 12pt;
  line-height: 1.2;
`;

export const HelpDescription = styled.p`
  font-size: 12pt;
  font-weight: 500;
`;

export const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 12px;
`;

export const HelpBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.grey100};
  border-radius: 5px;
  padding: 13px 15px;
  box-shadow: 0 0 3px ${colors.grey200};
`;

export const BoxDescription = styled.p`
  font-size: 9pt;
  font-weight: 500;
  color: ${colors.purple};
  line-height: 1;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
`;

export const RatingBox = styled.div`
  margin-top: 12px;
  width: 100%;
  border: 1px solid ${colors.grey100};
  border-radius: 5px;
  box-shadow: 0 0 3px ${colors.grey200};
  padding: 16px 20px;
`;

export const RatingHeader = styled.button`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  border: none;
  background: transparent;
`;

export const RatingTitle = styled.p`
  color: ${colors.purple};
  font-size: 10pt;
  font-weight: 500;
  margin: 0;
`;

export const Chevron = styled.div`
  display: inline-block;
  border-right: 3px solid ${colors.grey400};
  border-bottom: 3px solid ${colors.grey400};
  width: 10px;
  height: 10px;
  transform: ${({ isOpen }) =>
    isOpen
      ? 'rotate(-135deg) translateX(-6px)'
      : 'rotate(45deg) translateX(3px)'};
`;

export const Description = styled.p`
  font-size: 10pt;
`;

export const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

export const Divider = styled.hr`
  border-top: 1px solid ${colors.grey300};
`;

export const CandidateCard = styled.div`
  display: flex;
  align-items: center;
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
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 10pt;
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

export const AffinityTag = styled.span`
  color: #fff;
  background-color: ${colors.purple};
  border-radius: 11px;
  width: 53px;
  display: inline-flex;
  justify-content: center;
`;

export const ProfileLink = styled.a`
  height: 40px;
  width: 40px;
  padding: 5px 8px;
  border: 1px solid ${colors.grey100};
  border-radius: 3px;
  box-shadow: 0 0 3px ${colors.grey200};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
