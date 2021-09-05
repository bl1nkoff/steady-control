import { createDBConnection } from '../../src/scripts/connection'
 
export default function handler(req, res) {
  const mysql = createDBConnection()
  const query = `
  SELECT id, name, parentId,
    if ( parentId = -1, "Root", 
      if ( exists( SELECT id FROM citizensTree AS t2 WHERE t1.id = t2.parentId), "Inner", "Leaf" )
    )
  AS type FROM citizensTree as t1
  `
  mysql.query(query, ( error, answer ) => {
    if ( error ) { res.status(500).json( { error } ) }
    else{
      for ( let i = 0; i < answer.length; i++ ) {
        let node = answer[i]
        if ( node.type === "Leaf" &&
          node.parentId !== answer[i - 1].id &&
          node.parentId !== answer[i - 1].parentId ) {
            answer.splice( i, 1 )
            let parentID;
            for ( let j = 0; j < answer.length; j++ ) {
              if ( answer[j].id === node.parentId ) {
                parentID = j
              }
            }
            answer.splice( parentID + 1, 0, node )
        }
      }
      res.status(200).json( answer )
    }
    mysql.destroy()
  })
}
