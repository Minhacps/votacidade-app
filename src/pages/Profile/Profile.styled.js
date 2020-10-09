import styled from 'styled-components';
import colors from 'styles/colors';

export const CandidatePhoto = styled.img`
  background: ${colors.grey300};
  width: 143px;
  height: 143px;
  border-radius: 100%;
  margin: 0 auto;
  display: block;
`;

export const CandidateName = styled.p`
  margin: 11px auto 0;
  text-align: center;
  color: ${colors.purple};
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const CandidateNumber = styled.p`
  font-size: 14px;
  color: ${colors.grey500};
  margin: 0;
  text-align: center;
`;

export const CandidateBio = styled.p`
  font-size: 14px;
  color: ${colors.grey500};
  margin: 20px 0;
  border-bottom: 1px solid ${colors.grey300};
  padding-bottom: 20px;
`;

export const Affinity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AffinityTitle = styled.p`
  color: ${colors.purple};
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const Question = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid ${colors.grey300};
`;

export const Statement = styled.p`
  color: ${colors.grey500};
  font-size: 14px;
  & > span {
    color: ${colors.purple};
    font-weight: 600;
  }
`;
