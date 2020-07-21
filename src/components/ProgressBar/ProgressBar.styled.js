import styled from 'styled-components';
import colors from '../../styles/colors';

export const ProgressBarContainer = styled.div`
  background: ${colors.grey100};
  padding: 13px;

  .progress {
    background-color: #fff;
    position: relative;
    border-radius: 8px;
  }

  .progress-bar {
    background: linear-gradient(
      90deg,
      ${colors.orangeLight},
      ${colors.orangeDark}
    );
    border-radius: 8px;
  }
`;

export const ProgressBarTitle = styled.span`
  color: ${colors.grey500};
  font-size: 10px;
  display: block;
`;

export const ProgressBarLabel = styled.span`
  color: ${colors.purple};
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin: 5px 0;
`;
