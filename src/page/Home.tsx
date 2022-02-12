import React from 'react';
import Button from '@mui/material/Button';
import { useAuth } from '../hooks/useAuth';
// import { Container } from '@mui/material';
import TicTacToe from '../components/TicTacToe/TicTacToe';
const Home: React.FC = () => {
  const { logout } = useAuth();
  return (
    <>
      <h2
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          justifyContent: 'space-between',
        }}
      >
        welcome
        <Button
          onClick={async () => {
            const res = await logout();
          }}
          className="right"
          variant="contained"
          color="success"
        >
          Log out
        </Button>
      </h2>
      <TicTacToe />
    </>
  );
};
export default Home;
