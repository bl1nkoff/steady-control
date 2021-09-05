import citizens from "../input/citizens.json"
import cities from "../input/cities.json"

const result = [
  "CREATE TABLE `cities` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(64) NOT NULL , `data` VARCHAR(64) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;",
  "CREATE TABLE `citizensTree` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(64) NOT NULL , `parentId` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;"]

export default result 

let rows = [ null ]

const config = [ "city", "district", "street" ]

console.log(citizens.length)

atAll: for ( let i = 0; i < citizens.length; i++ ) {
  let lastParent = -1;
  for ( let j = 0; j < config.length && j < citizens[i].groups.length; j++) {
    const group = citizens[i].groups.find(el => el.type == config[j])
    if( group === undefined ) continue atAll
    let parentIndex = rows.indexOf(group.name)
    if ( parentIndex === -1 ) {
      parentIndex = rows.length
      writeSitizenSQLRow( parentIndex, lastParent, group.name )
      rows.push(group.name)
    } 
    lastParent = parentIndex
  }
  writeSitizenSQLRow( rows.length, lastParent,citizens[i].name )
  rows.push(citizens[i].name)
}

for ( let i = 0; i < cities.length; i++ ) {
  result.push(`INSERT INTO cities ( name, data ) VALUES ( "${cities[i].name}", "${cities[i].data}" );`)
}

function writeSitizenSQLRow (id, parentId, name) {
  result.push(`INSERT INTO citizensTree ( id, parentId, name ) VALUES ( ${id}, ${parentId}, "${name}" );`)
}