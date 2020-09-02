import styled from 'styled-components';
import {
  Form as ReactStrapForm,
  FormGroup as ReactStrapFormGroup,
} from 'reactstrap';

export const Form = styled(ReactStrapForm)`
  min-height: calc(100vh - 58px);
  padding: 30px 14px;
`;

export const FormGroupCheck = styled(ReactStrapFormGroup)`
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  background-color: #662d91;
  border: 0;
  color: #fff;
  min-height: 45px;
`;
