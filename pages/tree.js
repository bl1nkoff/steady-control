import React, { useEffect, useReducer, useState } from "react"
import Node from "../src/components/Node"
import Hint from "../src/components/Hint"
import { useRouter } from 'next/router';

function reduceCityLib ( state, cities ) {
  let cityMap = new Map()
  for ( let i = 0; i < cities.length; i++ ) {
    cityMap.set(cities[i].name, cities[i].data)
  }
  return cityMap
}

export default function SQL() {
  const [tree, setTree] = useState("Загрузка...")
  const [hintState, setHintState] = useState( { x: "-100", y: "-100", text: "Закрыто" } )
  const [citiesLib, dispatchCityLib] = useReducer( reduceCityLib, new Map() )

  const router = useRouter()

  useEffect( () => {
    Promise.all([
      fetch( "http://localhost:3000/api/get-tree" ),
      fetch( "http://localhost:3000/api/get-cities" )
    ]).then( results => {
      if ( !results.every( el => el.status !== 200) ) setTree( 'Ошибка: \n' + JSON.stringify( results, null, 2 ) )
      
      results[1].json().then( cities => {
        dispatchCityLib( cities )

        results[0].json().then( tree => 
          setTree( collapseTree(tree) )
        )
      })
    })
    .catch( err => setTree(`Ошибка: ${err}`) )
  }, [router.asPath])

  function collapseTree (nodes) {
    let roots = 0;
    for (let i = 0; i < nodes.length; i++) {
      if ( nodes[i].type == "Leaf" ) {
        nodes[i] = <Node name={ nodes[i].name } leaf={ true }/>
      } else if( nodes[i].type == "Root" ) {
        roots++
      }
    }
    let i = 0
    while ( roots > 0 ) {
      if ( nodes[i].name === undefined && nodes.type !== "Root") {
        let j = 1
        while ( nodes[ i + j ] !== undefined && nodes[ i + j ].name === undefined ) {
          j++
        } 
        const children = nodes.slice(i, i + j)
        if ( nodes[i - 1].type === "Root") {
          roots--
          nodes[ i - 1 ].children = children
        } else {
          nodes[ i - 1 ] = <Node name={ nodes[ i - 1 ].name }> { children } </Node>
        }
        nodes = nodes.slice( 0, i ).concat( nodes.slice( i + j ) )
      } else i++
      if ( i == nodes.length ) i = 0
    }
    return nodes
  }

  function showHint( event, rootText ) {
    let eventDoc = (event.target && event.target.ownerDocument) || document;
    let doc = eventDoc.documentElement;
    let body = eventDoc.body;

    const X = event.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
      (doc && doc.clientLeft || body && body.clientLeft || 0);
    const Y = event.clientY +
      (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
      (doc && doc.clientTop  || body && body.clientTop  || 0 );

    if ( event.target.matches(".node__name-leaf") ) setHintState({
      x: X,
      y: Y,
      text: rootText } )   
  }

  function hideHint() {
    setHintState({ x: "-1000", y: "-1000", text: "Закрыто" })
  }

  function getTitle( city ) {
    let key = city.replace(' г.', '')
    return `${key}, ${ citiesLib.get( key ) }`
  }

  return (
    <div className="tree-page">
      { typeof(tree) == "string" ? tree : [].map.call( tree, el =>
        <Node
          name={ el.name }
          key={ el.name }
          onMouseEnter={ showHint }
          onMouseLeave={ hideHint }
          rootText={ getTitle( el.name ) }>
            { el.children }
        </Node>
      )}
      <Hint className="tree-page__hint" state={ hintState }></Hint>
    </div>
  )
}