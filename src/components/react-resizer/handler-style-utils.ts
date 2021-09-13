import type { StandardVector } from "../utils/types"
import { allHandles, degToCursor, handleVectors } from './consts'

const DegToCursor = (deg: number) => {
  for (const ele of degToCursor) {
    let { start, end, cursor } = ele;
    if ((start > end && (start <= deg || deg < end)) || (start <= deg && deg < end)) {
      return cursor;
    }
  }
  return 'ew';
}


export const headingToCursorStyle = (deg: number) => {
  let styleStr = ''

  allHandles.forEach(key => {
    const v: StandardVector = handleVectors[key]
    const trueDeg =
      ((Math.round((Math.atan2(-v[1], v[0]) * 180) / Math.PI + 360) % 360) - deg + 360) % 360;
    styleStr += `
      &.${key}{
        &>.resizer-handle{
          cursor:${DegToCursor(trueDeg)}-resize;
        }
      }
    `
  })
  return styleStr
}





