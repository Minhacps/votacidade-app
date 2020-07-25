import styled from 'styled-components';

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? '#662D91' : '#E6E6E6')};
  color: ${(props) => (props.active ? '#fff' : '#6E6E6E')};
  border: ${(props) => (props.active ? 'none' : '1px solid #C9C9C9')};
  padding: 0 20px;
  height: 30px;
  border-radius: ${(props) =>
    props.active ? '3px 0px 0px 3px' : '0px 3px 3px 0px'};
  text-transform: uppercase;
  font-size: 10px;
`;

export { Tabs, TabButton };
