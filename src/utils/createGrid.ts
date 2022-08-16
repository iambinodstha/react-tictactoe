export function createGrid(size: number) {
    const initalGrid = new Array(size).fill(new Array(size).fill(null));
    return initalGrid;
}