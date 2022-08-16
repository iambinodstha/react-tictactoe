import { useEffect, useState } from 'react';

import { createGrid } from '../utils/createGrid';
import { checkSequence } from '../utils/checkSequence';
import GridItem from './GridItem';
import MessagePopup from './MessagePopup';
import '../App.css';


function TicTacToe() {
    const [grid, setGrid] = useState<(null | number)[][]>(createGrid(3));
    const [player, setPlayer] = useState(1);
    const [clickDisable, setClickDisable] = useState(false);
    const [gameSequence, setGameSequence] = useState<(null | number)[][]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);

    function playerTurn(row: number, col: number) {
        setClickDisable(true); // preventing user to click in grid until animation finish
        let newGrid: (null | number)[][] = JSON.parse(JSON.stringify(grid)); //deep copy gird
        newGrid[row][col] = player;
        setGrid(newGrid); // update grid with player move

        let sequence = checkSequence(newGrid, player); // check sequence if it is matched
        setGameSequence(sequence);

        setTimeout(() => {
            if (sequence.length) {
                setIsGameOver(true);
            } else {
                let isGameDraw = newGrid.every(grid => !grid.includes(null));
                if (isGameDraw) {
                    setIsGameOver(true);
                    setPlayer(0); // player 0 refers to draw
                } else {
                    setPlayer(prevState => prevState === 1 ? 2 : 1); //change player
                    setClickDisable(false);
                }
            }
        }, 510); // change player after animation
    }

    useEffect(() => {
        if (isGameOver) {
            setTimeout(() => {
                setIsPopupModalOpen(true);
            }, 500);
        }
    }, [isGameOver])

    function restartGame() {
        setGrid(createGrid(3));
        setPlayer(1);
        setIsGameOver(false);
        setGameSequence([]);
        setClickDisable(false);
        setIsPopupModalOpen(false);
    }

    return (
        <div className="App">
            <div>
                <div>
                    {grid.map((row, rowInd: number) => (
                        <div
                            className='grid-row'
                            key={rowInd}
                            style={{ borderColor: isGameOver ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.8)" }}
                        >
                            {row.map((col: number | null, colInd: number) => (
                                <GridItem
                                    key={colInd}
                                    col={col}
                                    rowInd={rowInd}
                                    colInd={colInd}
                                    clickDisable={clickDisable}
                                    playerTurn={playerTurn}
                                    gameSequence={gameSequence}
                                    isGameOver={isGameOver}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                {!isGameOver && <h1>{player === 1 ? "O" : "X"}'s Turn</h1>}

                {isPopupModalOpen && <MessagePopup
                    player={player}
                    restartGame={restartGame}
                />}
            </div>
        </div>
    );
}

export default TicTacToe;