import React from 'react'

export default function Hint ( { state } ) {
  return (
    <p className="hint"
      style={ {
        top: `${state.y}px`,
        left: `${state.x}px`
    }}> 
      { state.text }
    </p>
  )
}