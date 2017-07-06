'use strict'

const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-upsert'));

// if (PouchDB('inventory')) {
//   PouchDB('inventory').destroy()
//     .then(() => console.log('db successfully removed'))
//     .catch((err) => console.log(err))
// }

const db = new PouchDB('inventory');

module.exports = db;