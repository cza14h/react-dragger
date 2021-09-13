import React from 'react'
import DraggerCore from '../dragger-core'
import styles from './resizer-handle.module.scss'
import type { ResizerHandleProps, StandardVector } from '../utils/types'
import { getStandardVector } from './utils'

const { handle } = styles

class ResizerHandle extends DraggerCore<ResizerHandleProps> {

  standardVector: StandardVector

  resizing = false
  rotating = false


  constructor(props: ResizerHandleProps) {
    super(props)
    this.standardVector = getStandardVector(props.heading)
  }

  onResizeStart = (e: React.MouseEvent) => {
    const coordinates = this.getEventCoordinate(e)
    const res = this.props.onResizeStart?.(e, coordinates, this.standardVector)
    if (res === false) return
    this.resizing = true
    this._onMouseDown(e)
  }

  onResizing = (e: MouseEvent) => {
    const coordinates = this._onMouseMove(e)
    this.props.onResizing?.(e, coordinates, this.standardVector)
  }

  onResizeEnd = (e: MouseEvent) => {
    const coordinates = this._onMouseMove(e)
    this.props.onResizeEnd?.(e, coordinates, this.standardVector)
  }

  onDrag = (e: MouseEvent) => {
    if (this.resizing) { this.onResizing(e) }
    else if (this.rotating) { this.onRotating(e) }
  }

  onDragEnd = (e: MouseEvent) => {
    if (this.resizing) { this.onResizeEnd(e) }
    else if (this.rotating) { this.onRotateEnd(e) }
    this.resizing = this.rotating = false
    this._onMouseUp(e)
  }


  onRotateStart = (e: React.MouseEvent) => {
    const coordinates = this.getEventCoordinate(e)
    const res = this.props.onRotateStart?.(e, coordinates, this.standardVector)
    if (res === false) return
    this.rotating = true
    this._onMouseDown(e)
  }

  onRotating = (e: MouseEvent) => {
    const coordinates = this._onMouseMove(e)
    this.props.onRotating?.(e, coordinates, this.standardVector)
  }

  onRotateEnd = (e: MouseEvent) => {
    const coordinates = this._onMouseMove(e)
    this.props.onRotateEnd?.(e, coordinates, this.standardVector)
  }


  render() {
    const { heading } = this.props
    const outerProps: any = {};
    if (this.props.heading.length === 2) {
      outerProps['onMouseDown'] = this.onRotateStart
    }
    return <div
      className={`resizer-handle-outer ${handle} ${heading}`}
      {...outerProps}
    >
      <span className="resizer-handle"
        onMouseDown={this.onResizeStart}
      ></span>
    </div>
  }

}


export default ResizerHandle