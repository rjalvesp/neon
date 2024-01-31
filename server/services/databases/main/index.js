const R = require('ramda');
const { services } = require('../../../config');
const mysql = require('mysql2/promise');

let MainDB;

module.exports = {
  getMainConnection: () => MainDB,
  init: async () => {
    try {
      MainDB = await mysql.createConnection(services.databases.main);
      console.log('MAIN DB: Connection Successful');
    } catch (e) {
      console.log(e);
      console.error('MAIN DB: Connection Not Stablished');
    }
  },
};
