import { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';
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
  const [scoreRefresher, setScoreRefresher] = useState(0);
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  const [checkedMap, setCheckedMap] = useState({});
  const [isWinning, setIsWinning] = useState(false);
  const [totalScore, setTotalScore] = useState([]);
  useEffect(() => {
    const youWin = WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return checkedMap[index] === (circleTurn ? X_CLASS : CIRCLE_CLASS);
      });
    });
    setIsWinning(youWin);
  }, [checkedMap, currentClass]);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/score`, { withCredentials: true });
      console.log(res.data);
      setTotalScore(res.data);
    })();
  }, [scoreRefresher]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          marginTop: '10%',
          width: '50%',
          alignItems: 'start',
          flexDirection: 'row',
          justifyContent: 'space-around',
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
        <div>
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
          <Button
            sx={{ width: '100px', marginLeft: '8px' }}
            variant="contained"
            color="success"
            onClick={async () => {
              const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/score`,
                { score: `${circleTurn ? X_CLASS : CIRCLE_CLASS} Wins` },
                { withCredentials: true }
              );
              setScoreRefresher(scoreRefresher + 1);
            }}
          >
            save
          </Button>
          <br />
          <h3 style={{ color: '#66bb6a' }}>
            {isWinning && `UwU~~~~~ ${circleTurn ? X_CLASS : CIRCLE_CLASS} Wins`}
            <br />
            Your total scores:
            <br />
            {totalScore.map((score, index) => (
              <Fragment key={index}>
                {score}
                <br />
              </Fragment>
            ))}
          </h3>
        </div>
      </Box>
    </>
  );
};
export default TicTacToe;
