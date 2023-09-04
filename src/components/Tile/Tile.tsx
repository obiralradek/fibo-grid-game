'use client';

import { TileColor, TileProps } from '@/types';
import { styled } from 'styled-components';

export function Tile({ value, onClick, color }: TileProps) {
  return (
    <TileBody color={color} onClick={onClick}>
      {value ?? ''}
    </TileBody>
  );
}

const TileBody = styled.button<{ color?: TileColor }>`
  background: ${(props) => props.color};
  font-weight: 800;
  color: ${(props) => (props.color === 'yellow' ? 'black' : 'white')};
  width: 1.5rem;
  height: 1.5rem;
  border: 0.25rem solid #111;
  margin: 0.1rem;
`;

export default Tile;
