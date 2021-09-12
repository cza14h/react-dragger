import type { MouseEvent as ReactMouseEvent } from 'react'
import type ReactDragger from '../react-dragger/react-dragger'
import { coordinates } from './types'
import draggerStyles from '../react-dragger/index.module.scss'


const { common } = draggerStyles
export const getCoordinatesFromParent = (e: MouseEvent | ReactMouseEvent, parent: Element, scale: number) => {
  const { left, top } = parent.getBoundingClientRect()
  const x = (e.clientX + parent.scrollLeft - left) / scale
  const y = (e.clientY + parent.scrollTop - top) / scale
  return { x, y }
}


export const getDraggerRelativeCoordinates = (scope: ReactDragger, coordinate: coordinates) => {
  const { x, y } = scope.props.posture
  const [deltaX, deltaY] = [coordinate.x - scope.lastX, coordinate.y - scope.lastY];
  [scope.lastX, scope.lastY] = [coordinate.x, coordinate.y]
  return {
    x: Math.round(x + deltaX),
    y: Math.round(y + deltaY)
  }
}

export const getDraggerClassStatus = (hide: boolean, lock: boolean, active: boolean) => {
  let str = common + ' react-dragger';
  if (hide) str += ' hide';
  if (lock) str += ' lock';
  if (active) str += ' active';
  return str;
}


export const renderIndicator = (scope: ReactDragger) => {
  const { relOffsetX, relOffsetY, active, posture: { x, y } } = scope.props
  if (!active) return null
  const [trueX, trueY] = [x + relOffsetX, y + relOffsetY]
  return (
    <div className="position-indicator" >
      <div className="coordinates" > {`${trueX},${trueY}`} </div>
      <div className="position-line x" > </div>
      <div className="position-line y" > </div>
    </div>
  )
}


