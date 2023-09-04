import { useState } from 'react';
import { Board, Location, TileValue } from '@/types';
import { useColorBoard } from './useColorBoard';
import { copyBoard, initBoard, pushColumn } from '@/utils/boardUtils';

const HIGHLIGHT_DELAY_MS = 400;

export const useBoard = (boardWidth: number, boardHeight: number) => {
  const [board, setBoard] = useState<Board>(initBoard(boardWidth, boardHeight));
  const [diffBoard, setDiffBoard] = useState<Board>(
    initBoard(boardWidth, boardHeight),
  );
  const [locked, setLocked] = useState<boolean>(false);
  const [changedFields, setChangedFields] = useState<Location[]>([]);

  const { colorBoard } = useColorBoard(board, diffBoard, changedFields);

  const modifyTile = (width: number, height: number) => {
    if (locked) return;
    setLocked(true);
    if (width < 0 || width >= boardWidth || height < 0 || height >= boardHeight)
      return;
    let newBoard = copyBoard(board);
    // Update row
    newBoard[height].forEach(
      (value, i) => (newBoard[height][i] = value ? value + 1 : 1),
    );
    //Update column
    newBoard.forEach((row) => (row[width] = row[width] ? row[width]! + 1 : 1));
    // handle twice updated click point
    newBoard[height][width] = newBoard[height][width]! - 1;
    setBoard(newBoard);
    const { filteredBoard, changes } = filterOutFiboSequences(newBoard);
    setChangedFields(changes);
    setTimeout(() => {
      setBoard(filteredBoard);
      setDiffBoard(filteredBoard);
      setChangedFields([]);
      setLocked(false);
    }, HIGHLIGHT_DELAY_MS);
  };

  return { board, modifyTile, colorBoard };
};

function isFibonacciSequence(arr: TileValue[]) {
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

function removeAllFiboSequences(
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

function filterOutFiboSequences(board: Board) {
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

export default useBoard;
