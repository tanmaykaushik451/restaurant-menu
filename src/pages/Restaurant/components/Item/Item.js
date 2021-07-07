import React from 'react'
import "./Item.css"
import Draggable from 'react-draggable';


const Item = ({ name }) => {

  return (
    <Draggable>
      <div className="Item">
        <i class="fas fa-caret-right"></i><span className="ms-2">{name}</span>
      </div>
    </Draggable>
  )
}

export default Item
