import React from 'react';
import './Board.css';

export class Board extends React.Component {


    renderSquare = i => {
        return <Square handleClick={() => this.props.handleClick(i)} contents={this.props.board[i]} />
    }

    render() {
        return (
            <div className='Board'>
                <div className="status">{this.props.status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}

                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>

            </div>
        );
    }
}


const Square = (props) => {
    return <button onClick={props.handleClick} className='Square'>{props.contents}</button>;
}

