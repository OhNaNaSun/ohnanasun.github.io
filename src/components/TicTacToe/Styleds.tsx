import styled from 'styled-components';
const cellSize = 100;
const markSize = cellSize * 0.9;
const StyledContainer = styled.div`
  & {
    // width: 100%;
  }
  .board {
    width: 100%;
    // height: 100%;
    display: grid;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, auto);
  }

  .cell {
    width: ${cellSize}px;
    height: ${cellSize}px;
    border: 1px solid #adbac7;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .cell:first-child,
  .cell:nth-child(2),
  .cell:nth-child(3) {
    border-top: none;
  }

  .cell:nth-child(3n + 1) {
    border-left: none;
  }

  .cell:nth-child(3n + 3) {
    border-right: none;
  }

  .cell:last-child,
  .cell:nth-child(8),
  .cell:nth-child(7) {
    border-bottom: none;
  }

  .cell.x,
  .cell.circle {
    cursor: not-allowed;
  }

  .cell.x::before,
  .cell.x::after,
  .cell.circle::before {
    background-color: #66bb6a;
  }

  .board.x .cell:not(.x):not(.circle):hover::before,
  .board.x .cell:not(.x):not(.circle):hover::after,
  .board.circle .cell:not(.x):not(.circle):hover::before {
    background-color: lightblue;
  }

  .cell.x::before,
  .cell.x::after,
  .board.x .cell:not(.x):not(.circle):hover::before,
  .board.x .cell:not(.x):not(.circle):hover::after {
    content: '';
    position: absolute;
    width: ${markSize * 0.15}px;
    height: ${markSize}px;
  }

  .cell.x::before,
  .board.x .cell:not(.x):not(.circle):hover::before {
    transform: rotate(45deg);
  }

  .cell.x::after,
  .board.x .cell:not(.x):not(.circle):hover::after {
    transform: rotate(-45deg);
  }

  .cell.circle::before,
  .cell.circle::after,
  .board.circle .cell:not(.x):not(.circle):hover::before,
  .board.circle .cell:not(.x):not(.circle):hover::after {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  .cell.circle::before,
  .board.circle .cell:not(.x):not(.circle):hover::before {
    width: ${markSize}px;
    height: ${markSize}px;
  }

  .cell.circle::after,
  .board.circle .cell:not(.x):not(.circle):hover::after {
    width: ${markSize * 0.7}px;
    height: ${markSize * 0.7}px;
    // background-color: white;
    background-color: black;
  }

  .winning-message {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 5rem;
    flex-direction: column;
  }

  .winning-message button {
    font-size: 3rem;
    background-color: white;
    border: 1px solid black;
    padding: 0.25em 0.5em;
    cursor: pointer;
  }

  .winning-message button:hover {
    background-color: black;
    color: white;
    border-color: white;
  }

  .winning-message.show {
    display: flex;
  }
`;

export default StyledContainer;
