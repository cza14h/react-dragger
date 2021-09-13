import { FC, useState } from 'react'
import ReactDragger from './components/react-dragger/react-dragger'
import type { BasicPosture, ReactDraggerProps } from './components/utils/types'




const initialValue: ReactDraggerProps = {
  posture: { x: 200, y: 200, w: 200, h: 200, deg: 45 },
  active: true,
  setPosture(){}
}

const Example: FC = () => {
  const [config, setConfig] = useState<ReactDraggerProps>(initialValue)

  const cb = (e: MouseEvent, postrue: BasicPosture) => {
    setConfig({ ...config, posture: { ...config.posture, ...postrue } })
  }

  const setPosture = (postrue: Partial<BasicPosture>) => {
    setConfig({ ...config, posture: { ...config.posture, ...postrue } })
  }
  return <div style={{transform:`scale(1)`}}>
    <ReactDragger {...config} setPosture={setPosture} onDragging={cb} onDragEnd={cb}>
      child content
    </ReactDragger>

  </div>
}


export default Example

