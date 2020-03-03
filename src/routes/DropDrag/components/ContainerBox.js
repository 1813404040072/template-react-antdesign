import React from 'react'
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd'
const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
}
const ContainerBox = ({ moveBox, children }) => {

  const [, drop] = useDrop({
    accept: 'box',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveBox(item.id, left, top)
      return undefined
    },
  })

  return (
    <div ref={drop} style={styles}>
      {children}
    </div>
  )
}

ContainerBox.propTypes = {
  moveBox: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

ContainerBox.defaultProps = {
};

export default ContainerBox
