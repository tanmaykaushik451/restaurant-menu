import React from 'react'
import "./Item.css"

const Item = ({name}) => {

    return (
      <div className="Item">
         <i class="fas fa-caret-right"></i><span className="ms-2">{name}</span>
      </div>
    )
}

export default Item
