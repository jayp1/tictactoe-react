import './App.css';
import { Board } from './Board.js';
import React from 'react';

class Game extends React.Component {

  state = {
    history: [{ board: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  }

  handleClick = e => {
    const current = this.state.history[this.state.history.length - 1];

    if (calculateWinner(current.board) == null && current.board[e] == null) {
      const board = current.board.slice();
      board[e] = this.state.xIsNext ? 'X' : 'O';
      const newHistory = this.state.history.concat([{board:board}]);
      this.setState({ 
        history: newHistory,
        xIsNext: !this.state.xIsNext,
        stepNumber:this.state.stepNumber+1,
       });
    }

  }
  jumpToMove = step => {
    const history = this.state.history;
    const newBoard = history.slice(0, step+1);
    const xIsNext = step % 2 === 0 ? true : false;

    this.setState({history: newBoard, stepNumber: step, xIsNext: xIsNext });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length-1];

    
    const steps = history.map((board, step) => {
      const description = "Go to move #" + step; 
      return <li key={step}><button className="button-steps" onClick={()=>this.jumpToMove(step)}>{description}</button></li>;
    });

    let status;
    const result = calculateWinner(current.board);
    if (result != null) {
      status = "The Winner is : " + result;
    } else {
      status = "Next Player is: " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="App">
        <div className="Headline"><h3>Welcome to Tic Tac Toe by <b>PALZEN</b></h3></div>
        <Board board={current.board} handleClick={(i) => this.handleClick(i)} status={status}/>
        <div className="Steps">
          <ol>{steps.map(item => item)}</ol>
        </div>
        <footer className="Footer">
          <h4>Please visit <u><a target="_" href="https://www.github.com/jayp1">@jayp1</a></u></h4>
        </footer>
      </div>
    );
  }
}

const calculateWinner = board => {
  const lines =
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] === board[b] && board[a] === board[c]) {
      //this.setState({gameOver:true});
      return board[a];
    }
  }


  return null;
}

export default Game;
