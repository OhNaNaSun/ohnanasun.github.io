/* eslint-disable */
import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useAuth } from '../hooks/useAuth';

const LogInPage: React.FC = () => {
  const { login, signin } = useAuth();
  const [isSigning, setIsSigning] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (isSigning) {
        await signin({
          email: name,
          password,
        });
      } else {
        await login({
          email: name,
          password,
        });
      }
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 450,
        fontSize: '2rem',
        margin: '10% auto',
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        sx={{ m: 1, width: '100%' }}
        variant="filled"
        color="success"
      />
      <TextField
        name="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        sx={{ m: 1, width: '100%' }}
        variant="filled"
        color="success"
      />
      <Button variant="contained" color="success" type="submit">
        {!isSigning ? 'Log in' : 'Sign in'}
      </Button>
      {!isSigning && (
        <Button
          variant="text"
          color="success"
          onClick={() => {
            setIsSigning(true);
          }}
        >
          Sign in
        </Button>
      )}
      {isError && <Alert severity="error">Correct your username or password</Alert>}
    </Box>
  );
};

export default LogInPage;
