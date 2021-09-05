const mysqlModule = require('mysql');

const settings = {
  host: "blinkofn.beget.tech",
  user: "blinkofn_jobs",
  database: "blinkofn_jobs", /* Специальная отдельная база */
  password: "nv6VhdEZ7wNzEq!"
}

export const createDBConnection = mysqlModule.createConnection.bind( null, settings )