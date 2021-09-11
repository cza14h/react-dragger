import type { MouseEvent as ReactMouseEvent } from 'react'
import type ReactDragger from '../react-dragger'
import { coordinates } from './types'

export const getCoordinatesFromParent = (e: MouseEvent | ReactMouseEvent, parent: Element, scale: number) => {
  const { left, top } = parent.getBoundingClientRect()
  const x = (e.clientX - parent.scrollLeft - left) / scale
  const y = (e.clientY - parent.scrollTop - top) / scale
  return { x, y }
}




export const getDraggerRelativeCoordinates = (scope: ReactDragger, coordinate: coordinates) => {
  const { x, y } = scope.props.posture
  const [deltaX, deltaY] = [coordinate.x - scope.lastX, coordinate.y - scope.lastY];
  [scope.lastX, scope.lastY] = [coordinate.x, coordinate.y]
  return {
    x: x + deltaX,
    y: y + deltaY
  }
}
