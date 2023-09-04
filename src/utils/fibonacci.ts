import { TileValue, Location, Board } from '@/types';
import { pushColumn } from './boardUtils';

export function isFibonacciSequence(arr: TileValue[]): boolean {
  const n = arr.length;
  if (arr.includes(undefined)) return false;
  let firstDirection = true;
  let secondDirection = true;

  for (let i = 2; i < n; i++) {
    if (arr[i - 1]! + arr[i - 2]! !== arr[i]) {
      firstDirection = false;
      break;
    }
  }
  for (let i = n - 3; i >= 0; i--) {
    if (arr[i + 1]! + arr[i + 2]! !== arr[i]) {
      secondDirection = false;
      break;
    }
  }
  return firstDirection || secondDirection;
}

export function removeAllFiboSequences(
  inputArray: TileValue[],
  rowNumber: number,
  vertical = false,
) {
  const result = [...inputArray];
  let removedFields: Location[] = [];

  for (let start = 0; start + 5 <= inputArray.length; start++) {
    if (isFibonacciSequence(inputArray.slice(start, start + 5))) {
      for (let i = start; i < start + 5; i++) {
        result[i] = undefined;
        removedFields.push({
          y: vertical ? i : rowNumber,
          x: vertical ? rowNumber : i,
        });
      }
    }
  }

  return { newRow: result, changes: removedFields };
}

export function filterOutFiboSequences(board: Board) {
  let newBoardRows: Board = [];
  let newBoardCols: Board = Array(board.length).fill([]);
  let changesArray: Location[] = [];
  board.forEach((row, rowNumber) => {
    const { newRow, changes } = removeAllFiboSequences(row, rowNumber);
    newBoardRows.push(newRow);
    changesArray.push(...changes);
  });
  for (let col = 0; col < board[0].length; col++) {
    const column = board.map((row) => row[col]);
    const { newRow, changes } = removeAllFiboSequences(column, col, true);
    pushColumn(newBoardCols, newRow);
    changesArray.push(...changes);
  }
  for (let row = 0; row < newBoardRows.length; row++) {
    for (let col = 0; col < newBoardRows[row].length; col++) {
      newBoardRows[row][col] =
        newBoardCols[row][col] === undefined
          ? undefined
          : newBoardRows[row][col];
    }
  }
  return { filteredBoard: newBoardRows, changes: changesArray };
}
