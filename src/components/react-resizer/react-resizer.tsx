import DraggerCore from '../dragger-core'
import styled from 'styled-components'
import React, { CSSProperties, PureComponent } from 'react';
import ResizerHandle from './resizer-handle';
import type { coordinates, ReactResizerProps, ResizerHandleCallback, ResizerHandleCallbackNative, } from '../utils/types';
import { allHandles } from './consts'
import { calculateHandler, getCenter, getSymmetricCoord, rotateCoordinates } from './calcRotate';



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

  onResizeStart: ResizerHandleCallback = (e, c, v) => {
    e.stopPropagation()
    const [sX, sY] = v // standard vector 
    const { posture } = this.props
    const center = getCenter(posture);
    this.iterationPoint = rotateCoordinates({
      x: center.x + posture.w / 2 * sX,
      y: center.y + posture.h / 2 * sY,
    }, center, posture.deg)
    this.symmetricPoint = getSymmetricCoord(center, this.iterationPoint)
    this.lastX = c.x
    this.lastY = c.y
  }
  onResizing: ResizerHandleCallbackNative = (e, c, v) => {
    e.stopPropagation()
    this.iterationPoint.x += c.x - this.lastX
    this.iterationPoint.y += c.y - this.lastY
    const posture = calculateHandler(this.props.posture, this.iterationPoint, this.symmetricPoint, v)
    this.lastX = c.x
    this.lastY = c.y
    this.props.setPosture(posture)
  }
  onResizeEnd: ResizerHandleCallbackNative = (e, c, v) => {

  }


  render() {
    const { posture: { w, h, deg = 0 }, handles, className } = this.props
    return <div className={className + " react-resizer"} style={getResizerStyle(w, h, deg)}>
      <div className="inner-container">{this.props.children}</div>
      {handles.map(e => <ResizerHandle
        onResizeStart={this.onResizeStart}
        onResizing={this.onResizing}
        onResizeEnd={this.onResizeEnd}
        heading={e} key={e}
      />)}
    </div>
  }
}


const ReactResizerWrapper = styled(ReactResizer)`
  
`

export default ReactResizerWrapper