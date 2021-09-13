import React, { CSSProperties, PureComponent } from 'react';
import styled from 'styled-components'
import ResizerHandle from './resizer-handle';
import type { coordinates, ReactResizerProps, ResizerHandleCallback, ResizerHandleCallbackNative, StandardVector, } from '../utils/types';
import { allHandles } from './consts'
import { calculateHandler, centeralRotate, getCenter, getSymmetricCoord, rotateCoordinates } from './calcRotate';
import { headingToCursorStyle } from './handler-style-utils'

function getResizerStyle(w: number, h: number, deg: number): CSSProperties {
  return {
    width: `${w}px`,
    height: `${h}px`,
    transform: `rotate(${deg}deg)`
  }
}

const defaultProps = {
  handles: allHandles
}

class ReactResizer extends PureComponent<ReactResizerProps & typeof defaultProps> {

  lastX = 0
  lastY = 0

  symmetricPoint: coordinates = { x: 0, y: 0 }
  iterationPoint: coordinates = { x: 0, y: 0 }

  static defaultProps = defaultProps

  updateXY(x: number, y: number) {
    this.lastX = x
    this.lastY = y
  }

  iteratePoint(x: number, y: number) {
    this.iterationPoint.x += x - this.lastX
    this.iterationPoint.y += y - this.lastY
  }

  initIterationPoint([sX, sY]: StandardVector): [coordinates, coordinates] {
    const { posture } = this.props
    const center = getCenter(posture);
    const iterationPoint = rotateCoordinates({
      x: center.x + posture.w / 2 * sX,
      y: center.y + posture.h / 2 * sY,
    }, center, posture.deg)
    return [center, iterationPoint]
  }

  onResizeStart: ResizerHandleCallback = (e, c, v) => {
    e.stopPropagation()
    const [center, iterationPoint] = this.initIterationPoint(v)
    this.iterationPoint = iterationPoint
    this.symmetricPoint = getSymmetricCoord(center, this.iterationPoint)
    this.updateXY(c.x, c.y)
  }

  onResizing: ResizerHandleCallbackNative = (e, c, v) => {
    e.stopPropagation()
    this.iteratePoint(c.x, c.y)
    const posture = calculateHandler(this.props.posture, this.iterationPoint, this.symmetricPoint, v)
    this.props.setPosture(posture)
    this.updateXY(c.x, c.y)
  }

  onResizeEnd: ResizerHandleCallbackNative = (e, { x, y }, v) => {


  }


  rotateCenter: coordinates = { x: 0, y: 0 }
  lastDeg: number = 0
  onRotateStart: ResizerHandleCallback = (e, c, v) => {
    if (v[0] * v[1] === 0) return // only corner handler can rotate component 
    e.stopPropagation()
    const [center, iterationPoint] = this.initIterationPoint(v)
    this.rotateCenter = center; this.iterationPoint = iterationPoint;
    this.lastDeg = centeralRotate(this.rotateCenter, iterationPoint)
    this.updateXY(c.x, c.y)
  }

  onRotating: ResizerHandleCallbackNative = (e, c, v) => {
    e.stopPropagation();
    this.iteratePoint(c.x, c.y)
    const newDeg = centeralRotate(this.rotateCenter, this.iterationPoint)
    const deg = ((this.props.posture.deg ?? 0) + newDeg - this.lastDeg + 360) % 360
    this.props.setPosture({ deg })
    this.updateXY(c.x, c.y)
    this.lastDeg = newDeg
  }

  onRotateEnd: ResizerHandleCallbackNative = (e, { x, y }, v) => {


  }


  render() {
    const { posture: { w, h, deg = 0 }, handles, className } = this.props
    return <div className={className + " react-resizer"} style={getResizerStyle(w, h, deg)}>
      <div className="inner-container">{this.props.children}</div>
      {handles.map(e => <ResizerHandle
        onResizeStart={this.onResizeStart}
        onResizing={this.onResizing}
        onResizeEnd={this.onResizeEnd}
        onRotateStart={this.onRotateStart}
        onRotating={this.onRotating}
        onRotateEnd={this.onRotateEnd}
        heading={e} key={e}
      />)}
    </div>
  }
}


const ReactResizerWrapper = styled(ReactResizer)`
  &>.resizer-handle-outer{
    ${({ posture: { deg } }) => headingToCursorStyle(deg ?? 0)}
  }
`

export default ReactResizerWrapper