import type { DegToCursorType, Directions, ResizerHandleType, StandardVector } from '../utils/types';
export const allHandles = ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] as const

export const vectors: { [k in Directions]: [number, number] } = {
  n: [0, -1],
  s: [0, 1],
  e: [1, 0],
  w: [-1, 0],
};
const handleVectors: any = {}


export const getStandardVector = (heading: ResizerHandleType): StandardVector => {
  const orthogonalArr = heading.split('') as Directions[]
  return orthogonalArr.reduce<StandardVector>(
    (a, b: Directions) => {
      return [a[0] + vectors[b][0], a[1] + vectors[b][1]] as StandardVector
    }
    , [0, 0])
}


allHandles.forEach((e) => {
  handleVectors[e] = getStandardVector(e)
})

export { handleVectors }

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

