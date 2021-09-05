import React from "react"
import CodeForMySQL from "../src/scripts/CodeForMySQL"

export default function SQL() {

  function copySQL (params) {
    
  }

  return (
    <div className="sql-page">
      {/* <button className="btn sql-page__copy">Скопировать</button> */}
      <code className = "code"> {
        CodeForMySQL.map( (el, index) => 
          <p
            className = {"code__p" + ( index % 2 == 0 ? " code__p-gray" : "" ) }
            key={index}>
              { el }
          </p>
        )}
      </code>
    </div>
  )
}