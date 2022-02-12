/* eslint-disable */
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useAuth } from './hooks/useAuth';
import LogInPage from './page/LogInPage';
import Home from './page/Home';
import './css/global.css';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const App: React.FC = () => {
  const auth = useAuth();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          //   display: 'flex',
          width: '100%',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          //   borderRadius: 1,
          //   p: 3,
        }}
      >
        {auth?.authed ? <Home /> : <LogInPage />}
      </Box>
    </ThemeProvider>
  );
};
export default App;
