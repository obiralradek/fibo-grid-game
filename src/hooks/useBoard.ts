import { useState } from 'react';
import { Board, Location } from '@/types';
import { useColorBoard } from './useColorBoard';
import { copyBoard, initBoard } from '@/utils/boardUtils';
import { filterOutFiboSequences } from '@/utils/fibonacci';

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

export default useBoard;
