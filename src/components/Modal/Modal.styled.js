import styled from 'styled-components';
import {
  ModalHeader as ModalHeaderOriginal,
  ModalFooter as ModalFooterOriginal,
} from 'reactstrap';

import colors from '../../styles/colors';

export const ModalHeader = styled(ModalHeaderOriginal)`
  background-color: ${colors.purple};
  color: #fff;
  justify-content: center;

  & .close {
    position: absolute;
    top: 1.2rem;
    right: 1rem;
    color: #fff;
    opacity: 0.8;
  }
`;

export const ModalFooter = styled(ModalFooterOriginal)`
  justify-content: center;
  border: 0;
  padding-top: 0;
`;
