import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Authenticator from './Authenticator';
import ContentGuard from './ContentGuard';
import Router from './Router';

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Authenticator>
          <ContentGuard>
            <Router />
          </ContentGuard>
        </Authenticator>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
