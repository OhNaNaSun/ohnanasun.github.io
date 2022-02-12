/* eslint-disable */
import React, { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { theme } from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useAuth } from './hooks/useAuth';
import LogInPage from './page/LogInPage';
import Home from './page/Home';
import './css/markdown-body.css';
import './css/global.css';

const App: React.FC = () => {
  const auth = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {auth?.authed ? (
        <Container>
          <Home />
        </Container>
      ) : (
        <LogInPage />
      )}
    </ThemeProvider>
  );
};
export default App;
