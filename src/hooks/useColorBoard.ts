import { Board, TileColor, TileValue } from '@/types';

export const useColorBoard = (
  currentBoard: Board,
  previousBoard: Board,
  changedFields: { y: number; x: number }[],
) => {
  let colorBoard: TileColor[][] = Array.apply(
    null,
    Array(currentBoard.length),
  ).map(() =>
    Array.apply(null, Array(currentBoard[0].length)).map(() => 'grey'),
  );

  currentBoard.forEach((row, rowNum) =>
    row.forEach(
      (el, colNum) =>
        (colorBoard[rowNum][colNum] = getTileColor(
          previousBoard[rowNum][colNum],
          currentBoard[rowNum][colNum],
          rowNum,
          colNum,
          changedFields,
        )),
    ),
  );

  return { colorBoard };
};

const getTileColor = (
  prev: TileValue,
  curr: TileValue,
  rowNum: number,
  colNum: number,
  changedFields: { y: number; x: number }[],
): TileColor => {
  if (changedFields.find((el) => rowNum === el.y && colNum === el.x))
    return 'green';
  if (prev === curr) {
    return '#222';
  }
  return 'yellow';
};

function isPerfectSquare(x: number) {
  let s = Math.round(Math.sqrt(x));
  return s * s == x;
}

function isFibonacci(n: TileValue) {
  if (typeof n === 'undefined') return false;
  return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
}

export default useColorBoard;
