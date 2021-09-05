import React from "react"

export default function Node ( { name, children, leaf = false, onMouseEnter = null, onMouseLeave = null, rootText = "" } ) {
  return (
    <div
      className="node"
      key={ name }
      onMouseOver={ onMouseEnter ? event => onMouseEnter( event, rootText) : null }
      onMouseOut={onMouseLeave}>
        <p className={ "node__name" + ( leaf ? " node__name-leaf" : "" ) }>{ name }</p>
        { children !== undefined ? <div className="node__children">{ children }</div> : null }
    </div>
  )
}