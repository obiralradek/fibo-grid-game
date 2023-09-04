'use client';

import { useBoard } from '@/hooks';
import { GameBoardProps } from '@/types';
import { Tile } from '..';
import { styled } from 'styled-components';

export function GameBoard({ width, height }: GameBoardProps) {
  const { board, modifyTile, colorBoard } = useBoard(width, height);
  return (
    <div>
      {board.map((row, rowNumber) => (
        <BoardRow key={rowNumber}>
          {row.map((tile, colNumber) => (
            <Tile
              key={colNumber}
              value={tile}
              x={colNumber}
              y={rowNumber}
              onClick={() => modifyTile(colNumber, rowNumber)}
              color={colorBoard[rowNumber][colNumber]}
            />
          ))}
        </BoardRow>
      ))}
    </div>
  );
}

const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export default GameBoard;
