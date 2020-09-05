import styled from 'styled-components';
import colors from '../../styles/colors';

export const ProgressBarContainer = styled.div`
  background: ${colors.grey100};
  padding: 13px;
  max-width: 1105px;
  margin: 0 auto;

  .progress {
    background-color: #fff;
    position: relative;
    border-radius: 8px;

    &::after {
      content: '';
      width: 10px;
      height: 10px;
      background: ${(props) => (props.progress > 70 ? '#fff' : colors.grey300)};
      position: absolute;
      top: 0;
      left: 70%;
      border-radius: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
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
  font-size: 8pt;
  display: block;
`;

export const ProgressBarLabel = styled.span`
  color: ${colors.purple};
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin: 5px 0;
`;
