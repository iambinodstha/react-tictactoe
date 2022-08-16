export function checkSequence(grid: (null | number)[][], player: number) {
    let n = grid.length;
    let sequence: (null | number)[][] = [];
    let leftToRightDiagonalSeq = [];
    let rightToLeftDiagonalSeq = [];

    for (let i = 0; i < n; i++) {
        let leftToRightSeq = [];
        let topToBottomSeq = [];
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === player) {
                leftToRightSeq.push([i, j]);
            }
            if (grid[j][i] === player) {
                topToBottomSeq.push([j, i]);
            }
            if (i === j && grid[i][j] === player) {
                leftToRightDiagonalSeq.push([i, j]);
            }
            if (i === j && grid[i][(n - 1) - i] === player) {
                rightToLeftDiagonalSeq.push([i, (n - 1) - i]);
            }
        }
        if (leftToRightSeq.length === 3) {
            sequence = leftToRightSeq;
            break;
        } else if (topToBottomSeq.length === 3) {
            sequence = topToBottomSeq;
            break;
        }
    }

    if (leftToRightDiagonalSeq.length === 3) {
        sequence = leftToRightDiagonalSeq;
    } else if (rightToLeftDiagonalSeq.length === 3) {
        sequence = rightToLeftDiagonalSeq;
    }

    return sequence;
}