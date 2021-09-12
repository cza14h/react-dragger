import React, { Component, createRef } from 'react';
import { getCoordinatesFromParent } from './utils/calc'
import type { DraggerCoreProps, coordinates } from './utils/types'


class DraggerCore<T extends DraggerCoreProps = DraggerCoreProps> extends Component<T> {

  draggerRef = createRef<HTMLDivElement>()

  dragging = false

  _onMouseDown = (e: React.MouseEvent) => {
    if (!this.dragging) {
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.onDragEnd, { capture: true })
    }
    return this.getEventCoordinate(e)
  }

  onDrag = (e: MouseEvent) => {
    this._onMouseMove(e)
  }

  onDragEnd = (e: MouseEvent) => {
    this._onMouseUp(e)
  }

  _onMouseMove = (e: MouseEvent): coordinates => {
    this.dragging = true
    return this.getEventCoordinate(e)
  }


  getOffsetRef() {
    // (window as any).a = this.props.nodeRef?.current ?? this.draggerRef.current?.offsetParent ?? document.body
    // return this.props.nodeRef?.current ?? this.draggerRef.current?.offsetParent ?? document.body
    return this.props.nodeRef?.current ?? this.draggerRef.current?.offsetParent ?? document.body
  }

  getEventCoordinate(e: MouseEvent | React.MouseEvent) {
    const scale = this.props.getScale?.() ?? 1
    const offsetParent = this.getOffsetRef()
    return getCoordinatesFromParent(e, offsetParent, scale)
  }

  _onMouseUp = (e: MouseEvent) => {
    this.dragging = false
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.onDragEnd, { capture: true })
    return this.getEventCoordinate(e)
  }


  render(): React.ReactNode {
    // const children: any = React.Children.only(this.props.children)
    // if (!children && React.isValidElement(children)) return null
    // return React.cloneElement(children, {
    //   ref: this.draggerRef,
    //   onMouseDown: this.onDragStart
    // })
    return null
  }
}

export default DraggerCore