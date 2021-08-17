import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from 'globalStyles';
import history from 'configs/history';
import AuthRoute from 'routes/AuthRoute';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <AuthRoute>
        <ChakraProvider>
          <GlobalStyle />
          <App />
        </ChakraProvider>
      </AuthRoute>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
