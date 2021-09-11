import DraggerCore from '../dragger-core'
import styled from 'styled-components'
import { PureComponent } from 'react';
import ResizerHandle from './resizer-handle';
import { ReactResizerProps } from '../utils/types';


const allHandles = ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] as const
const ReactResizerWrapper = styled.div`
  
`

function getResizerStyle(w: number, h: number, deg: number) {
  return {
    width: `${w}px`,
    height: `${h}px`,
    transfrom: `rotate(${deg}deg)`
  }
}

class ReactResizer extends PureComponent<ReactResizerProps> {




  render() {
    const { w, h, deg = 0 } = this.props.posture
    return <div className="react-resizer" style={getResizerStyle(w, h, deg)}>
      <div className="inner-container">{this.props.children}</div>
      {allHandles.map(e => <ResizerHandle heading={e} />)}
    </div>
  }
}

export default ReactResizer