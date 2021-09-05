import { createDBConnection } from '../../src/scripts/connection'
 
export default function handler(req, res) {
  const mysql = createDBConnection()
  const query = `SELECT name, data FROM cities`
  mysql.query(query, ( error, answer ) => {
    if ( error ) { res.status(500).json( { error } ) }
    res.status(200).json( answer )
    mysql.destroy()
  })
}
