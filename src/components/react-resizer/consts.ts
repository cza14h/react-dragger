import type { DegToCursorType ,Directions} from '../utils/types';
export const dia = 6,
  padding = 12,
  offset = `${dia + padding / 2}px`,
  middle = `calc( 50% - ${offset})`;

export const vectors: { [k in Directions]: [number, number] } = {
  n: [0, 1],
  s: [0, -1],
  e: [1, 0],
  w: [-1, 0],
};

export const degToCursor: DegToCursorType = [
  { start: 113, end: 158, cursor: 'nwse' },
  { start: 68, end: 113, cursor: 'ns' },
  { start: 23, end: 68, cursor: 'nesw' },
  { start: 338, end: 23, cursor: 'ew' },
  { start: 158, end: 203, cursor: 'ew' },
  { start: 203, end: 248, cursor: 'nesw' },
  { start: 248, end: 293, cursor: 'ns' },
  { start: 293, end: 338, cursor: 'nwse' },
];

export const handlers = {
  nw: `top: -${offset};left: -${offset};`,
  n: `top: -${offset};left: ${middle};`,
  ne: `top: -${offset};right: -${offset};`,
  w: `top: ${middle};left: -${offset};`,
  e: `top: ${middle};right: -${offset};`,
  sw: `bottom: -${offset};left: -${offset};`,
  s: `bottom: -${offset};left: ${middle};`,
  se: `bottom: -${offset};right: -${offset};`,
};
