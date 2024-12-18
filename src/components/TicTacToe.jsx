import React, { useState, useEffect } from 'react';

const Square = ({ value, onClick }) => {
    return <button onClick={onClick} className='square'>{value}</button>;
};

const TicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState('');

    const getWinner = (squares) => {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
        ];
        for (let i = 0; i < winningPatterns.length; i++) {
            const [a, b, c] = winningPatterns[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (getCurrentSquare) => {
        let copySquares = [...squares];
        if (getWinner(copySquares) || copySquares[getCurrentSquare]) return;
        copySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
        setIsXTurn(!isXTurn);
        setSquares(copySquares);
    };

    const handleRestart = () => {
        setIsXTurn(true)
        setSquares(Array(9).fill(""));
    }

    useEffect(() => {
        const winner = getWinner(squares);
        if (!winner && squares.every(item => item !== '')) {
            setStatus('This is a Draw! Start again');
        } else if (winner) {
            setStatus(`Winner is ${winner}`);
        } else {
            setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
        }
    }, [squares, isXTurn]);

    return (
        <div className='ttt-container'>
            <div className='row'>
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className='row'>
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className='row'>
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
            <h1>{status}</h1>
            <button className='restart' onClick={handleRestart}>Restart</button>
        </div>
    );
};

export default TicTacToe;