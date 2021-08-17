import React from 'react';
import Header from 'components/Header';
import Routes from 'routes';
import { useAuth0 } from '@auth0/auth0-react';

function App(): JSX.Element {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
