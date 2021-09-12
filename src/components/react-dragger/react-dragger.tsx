import React from 'react';
import type { ReactDraggerProps } from '../utils/types'
import DraggerCore from '../dragger-core'
import ReactResizer from '../react-resizer/react-resizer';
import { getDraggerClassStatus, getDraggerRelativeCoordinates, renderIndicator } from '../utils/calc';


function getDraggerStyle(x: number, y: number) {
  return {
    transform: `translate(${x}px,${y}px)`
  }
}


const defaultProps = {
  semi: false,
  hover: false,
  hide: false,
  lock: false,
  relOffsetX: 0,
  relOffsetY: 0,
}

type DefaultProps = typeof defaultProps

class ReactDragger extends DraggerCore<ReactDraggerProps & DefaultProps> {

  static defaultProps = defaultProps

  lastX: number = 0
  lastY: number = 0

  onDragStart = (e: React.MouseEvent) => {
    if (!this.props.active || this.props.lock) return;
    const res = this.props.onDragStart?.(e)
    if (res === false) return
    e.stopPropagation()
    const { x, y } = this._onMouseDown(e);
    [this.lastX, this.lastY] = [x, y]
  }

  onDrag = (e: MouseEvent) => {
    e.preventDefault()
    const coordinates = this._onMouseMove(e)
    const { x, y } = getDraggerRelativeCoordinates(this, coordinates);
    this.props.onDragging?.(e, { x, y })
  }

  onDragEnd = (e: MouseEvent) => {
    e.preventDefault()
    const coordinates = this._onMouseUp(e)
    const { x, y } = getDraggerRelativeCoordinates(this, coordinates);
    this.props.onDragEnd?.(e, { x, y })
  }

  renderIndicator() {
    return renderIndicator(this)
  }


  render() {
    const { posture: { x, y }, active, semi, hover, hide, lock } = this.props
    return (
      <div
        ref={this.draggerRef} className={getDraggerClassStatus(hide, lock, active || semi)}
        style={getDraggerStyle(x, y)}
        onMouseDown={this.onDragStart}
      // onMouseOverCapture={}
      // onMouseLeave={}
      >
        {this.renderIndicator()}
        <ReactResizer
          nodeRef={this.draggerRef}
          posture={this.props.posture}
          setPosture={this.props.setPosture}
        >
          {this.props.children}
        </ReactResizer>
      </div>

    )
  }
}



export default ReactDragger