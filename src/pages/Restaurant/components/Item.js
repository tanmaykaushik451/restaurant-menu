import React from 'react'

const Item = ({name}) => {

    return (
      <div className="d-flex align-items-baseline">
         <i class="fas fa-caret-right"></i><span className="ms-2">{name}</span>
      </div>
    )
}

export default Item
