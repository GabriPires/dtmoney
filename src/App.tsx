import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  color: '#333';
`;

export const App = () => {
  return (
    <div className="App">
      <Title>Hello world</Title>
    </div>
  );
};
