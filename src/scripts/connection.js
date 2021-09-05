const mysqlModule = require('mysql');

const settings = {
  host: "blinkofn.beget.tech",
  user: "blinkofn_jobs",
  database: "blinkofn_jobs",
  password: "nv6VhdEZ7wNzEq!",
  multipleStatements: true
}

export const createDBConnection = mysqlModule.createConnection.bind( null, settings )