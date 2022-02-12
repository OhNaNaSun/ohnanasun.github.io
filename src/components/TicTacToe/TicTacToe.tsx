import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import StyledContainer from './Styleds';
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const TicTacToe = () => {
  const [circleTurn, setCircleTurn] = useState(false);
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  const [checkedMap, setCheckedMap] = useState({});
  const [isWinning, setIsWinning] = useState(false);
  useEffect(() => {
    const youWin = WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return checkedMap[index] === (circleTurn ? X_CLASS : CIRCLE_CLASS);
      });
    });
    setIsWinning(youWin);
  }, [checkedMap, currentClass]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          marginTop: '10%',
          width: '50%',
          alignItems: 'end',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <StyledContainer>
          <div className={`board ${circleTurn ? CIRCLE_CLASS : X_CLASS}`}>
            {Array(9)
              .fill(null)
              .map((key, index) => {
                return (
                  <div
                    key={index}
                    className={`cell ${checkedMap[index]}`}
                    data-cell
                    onClick={() => {
                      setCheckedMap({
                        [index]: currentClass,
                        ...checkedMap,
                      });
                      setCircleTurn(!circleTurn);
                    }}
                  ></div>
                );
              })}
          </div>
        </StyledContainer>
        <h3 style={{ color: '#66bb6a' }}>
          {isWinning && `UwU~~~~~ ${circleTurn ? X_CLASS : CIRCLE_CLASS} Wins`}
          <Button
            sx={{ width: '100px', marginLeft: '8px' }}
            variant="contained"
            color="success"
            onClick={() => {
              setCheckedMap({});
              setIsWinning(false);
              setCircleTurn(false);
            }}
          >
            Restart
          </Button>
        </h3>
      </Box>
    </>
  );
};
export default TicTacToe;
