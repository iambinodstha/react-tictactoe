import { memo, useMemo } from 'react';

import { ReactComponent as CircleIcon } from "../assets/svg/circle.svg";
import { ReactComponent as CrossIcon } from "../assets/svg/cross.svg";

type GridItemProps = {
    col: number | null;
    rowInd: number;
    colInd: number;
    clickDisable: boolean;
    isGameOver: boolean;
    playerTurn: (rowInd: number, colInd: number) => void;
    gameSequence: (number | null)[][];
}

const GridItem = memo(({ col, rowInd, colInd, clickDisable, playerTurn, gameSequence, isGameOver }: GridItemProps) => {
    const isPainted = useMemo(() => gameSequence.some(seq => {
        return seq[0] === rowInd && seq[1] === colInd
    }), [gameSequence]);

    return (
        <div
            onClick={() => col === null ? playerTurn(rowInd, colInd) : null}
            key={colInd}
            className="grid-cell"
            style={{
                pointerEvents: (clickDisable || col !== null) ? "none" : "unset",
                borderColor: isGameOver ? "rgba(0,0,0,0.2)" : "rgba(0, 0, 0, 0.8)"
            }}
        >
            {col === 1 ? (
                <CircleIcon style={{ opacity: isGameOver ? isPainted ? 1 : 0.4 : 1 }} className='circle-icon' />
            ) : col === 2 ? (
                <CrossIcon style={{ opacity: isGameOver ? isPainted ? 1 : 0.4 : 1 }} className='cross-icon' />
            ) : null}
        </div>
    )
});

export default GridItem;