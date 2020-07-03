import React from 'react';
import { Container } from 'reactstrap';

import Routes from './Routes';

const App = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(setUser);
  // }, []);

  // if (!user) {
  //   return <SignInForm />;
  // }

  return (
    <Container data-testid="app">
      <Routes />
    </Container>
  );
};

export default App;
