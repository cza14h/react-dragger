export type coordinates = {
  x: number,
  y: number
}

export type DraggerCoreProps = {
  nodeRef?: React.RefObject<HTMLDivElement>
  getScale?: () => number
}

export type BasicPosture = {
  x: number,
  y: number,
  w: number,
  h: number,
  deg?: number
} & { [key: string]: any }

export type ReactDraggerProps = {
  posture: BasicPosture
  lock?: boolean
  hide?: boolean
  semi?: boolean
  active: boolean
  hover?: boolean
  relOffsetX?: number
  relOffsetY?: number
  setPosture: (e: Partial<BasicPosture>) => void
  onActivate?(): void
  onDragStart?(e: React.MouseEvent): false | void
  onDragging?(e: MouseEvent, c: coordinates): false | void
  onDragEnd?(e: MouseEvent, c: coordinates): false | void
} & DraggerCoreProps

export type ReactResizerProps = {
  className?: string
  posture: BasicPosture
  setPosture: (e: Partial<BasicPosture>) => void
  handles?: ResizerHandleType[]
  lockAspectRatio?: () => boolean | boolean
} & DraggerCoreProps


export type ResizerHandleCallback = (e: React.MouseEvent, c: coordinates, v: StandardVector) => false | void
export type ResizerHandleCallbackNative = (e: MouseEvent, c: coordinates, v: StandardVector) => false | void

export type ResizerHandleType = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'
export type ResizerHandleProps = {
  heading: ResizerHandleType
  onResizeStart?: ResizerHandleCallback
  onResizing?: ResizerHandleCallbackNative
  onResizeEnd?: ResizerHandleCallbackNative
  onRotateStart?: ResizerHandleCallback
  onRotating?: ResizerHandleCallbackNative
  onRotateEnd?: ResizerHandleCallbackNative
} & DraggerCoreProps

export type CursorStyle = 'nwse' | 'ns' | 'nesw' | 'ew';
export type Directions = 'n' | 's' | 'e' | 'w';
export type DegToCursorType = { start: number; end: number; cursor: CursorStyle }[];

export type StandardNumber = -1 | 0 | 1
export type StandardVector = [StandardNumber, StandardNumber]