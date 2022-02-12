/* eslint-disable */
import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const LogInPage: React.FC = () => {
  const { login, signin } = useAuth();
  const [isSigning, setIsSigning] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isSigning) {
      signin({
        email: name,
        password,
      });
    } else {
      login({
        email: name,
        password,
      });
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
        '& > input': { color: 'white !important' },
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
        focused
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
        focused
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
    </Box>
  );
};

export default LogInPage;
