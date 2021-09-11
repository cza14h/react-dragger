export type coordinates = {
  x: number,
  y: number
}

export type DraggerCoreProps = {
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
  onDragStart?(e: React.MouseEvent): false | void
  onDragging?(e: MouseEvent, c: coordinates): false | void
  onDragEnd?(e: MouseEvent, c: coordinates): false | void
} & DraggerCoreProps

export type ReactResizerProps = {
  posture: BasicPosture
} & DraggerCoreProps


export type ResizerHandleType = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'
export type ResizerHandleProps = {
  heading: ResizerHandleType
} & DraggerCoreProps

export type CursorStyle = 'nwse' | 'ns' | 'nesw' | 'ew';
export type Directions = 'n' | 's' | 'e' | 'w';
export type DegToCursorType = { start: number; end: number; cursor: CursorStyle }[];