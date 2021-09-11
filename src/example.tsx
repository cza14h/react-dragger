import { FC, useState } from 'react'
import ReactDragger from './components/react-dragger/react-dragger'
import type { coordinates, ReactDraggerProps } from './components/utils/types'




const initialValue: ReactDraggerProps = {
  posture: { x: 200, y: 200, w: 200, h: 200, deg: 0 },
  active: true,

}

const Example: FC = () => {
  const [config, setConfig] = useState<ReactDraggerProps>(  initialValue)

  const cb = (e: MouseEvent, { x, y }: coordinates) => {
    setConfig({ ...config, posture: { ...config.posture,x,y } })
  }
  return <div>
    <ReactDragger {...config} onDragging={cb} onDragEnd={cb}>
      child content
    </ReactDragger>

  </div>
}


export default Example

