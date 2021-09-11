import DraggerCore from '../dragger-core'
import styles from './resizer-handle.module.scss'
import type { ResizerHandleProps } from '../utils/types'

const { handle } = styles

class ResizerHandle extends DraggerCore<ResizerHandleProps> {





  render() {
    const { heading } = this.props
    return <div className={`resizer-handle-outer ${handle} ${heading}`}>
      <span className={`resizer-handle `}></span>
    </div>
  }

}


export default ResizerHandle