export interface GameBoardProps {
  height: number;
  width: number;
}

export interface TileProps {
  x: number;
  y: number;
  value: TileValue;
  onClick: any;
  color: TileColor;
}

export type Board = TileValue[][];

export type TileColor = 'grey' | 'yellow' | 'green' | string;

export type TileValue = number | undefined;

export type Location = { x: number; y: number };
