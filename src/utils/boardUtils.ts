import { Board, TileValue } from '@/types';

export const initBoard = (
  width: number,
  height: number,
  value: any = undefined,
): Board => {
  return Array(height).fill(Array(width).fill(value));
};

export const copyBoard = (board: Board): Board => {
  return board.map((row) => [...row]);
};

export const pushColumn = (arr: TileValue[][], column: TileValue[]) => {
  // Transpose the original array
  const transposedArr: TileValue[][] = arr[0].map((_, colIndex) =>
    arr.map((row) => row[colIndex]),
  );

  // Push the column to the transposed array
  transposedArr.push(column);

  // Transpose the transposed array back to the original format
  arr.length = 0;
  transposedArr[0].forEach((_, colIndex) => {
    arr.push(transposedArr.map((row) => row[colIndex]));
  });
};
