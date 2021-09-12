import type { ResizerHandleType, StandardNumber, StandardVector, Directions } from "../utils/types"
import { vectors } from './consts'




export const headingToCursorStyle = (deg: number, standardX: StandardNumber, standardY: StandardNumber) => {
}


const degToCursor = (deg: number) => {

}

export const getStandardVector = (heading: ResizerHandleType): StandardVector => {
  const orthogonalArr = heading.split('') as Directions[]
  return orthogonalArr.reduce<StandardVector>(
    (a, b: Directions) => {
      return [a[0] + vectors[b][0], a[1] + vectors[b][1]] as StandardVector
    }
    , [0, 0])
}


