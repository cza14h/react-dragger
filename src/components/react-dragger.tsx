import React from 'react';
import type { ReactDraggerProps } from './utils/types'
import DraggerCore from './dragger-core'
import styles from './index.module.scss'
import ReactResizer from './react-resizer/react-resizer';
import { getDraggerRelativeCoordinates } from './utils/calc';

const { 'common': dragger } = styles


function getDraggerStyle(x: number, y: number) {
  return {
    transform: `translate(${x}px,${y}px)`
  }
}



class ReactDragger extends DraggerCore<ReactDraggerProps> {


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
    const res = this.props.onDragging?.(e, { x, y })
    if (res === false) return
    e.stopPropagation()
  }

  onDragEnd = (e: MouseEvent) => {
    e.preventDefault()
    const coordinates = this._onMouseUp(e)
    const { x, y } = getDraggerRelativeCoordinates(this, coordinates);
    const res = this.props.onDragEnd?.(e, { x, y })
    if (res === false) return
    e.stopPropagation()
  }

  render() {
    const { posture: { x, y, w, h, deg = 0 } } = this.props

    return (
      <div
        ref={this.draggerRef} className={dragger + ' react-dragger'}
        style={getDraggerStyle(x, y)}
        onMouseDown={this.onDragStart}
      >
        <div className="position-indicator">
          <div className="coordinates"></div>
          <div className="position-line x"></div>
          <div className="position-line y"></div>
        </div>
        <ReactResizer posture={this.props.posture}>
          {this.props.children}
        </ReactResizer>
      </div>

    )
  }
}



export default ReactDragger