const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-upsert'));
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('inventory');

//utility import
const parseCsv = require('../utilities/parseCsv');
const fillSchema = require('../utilities/fillSchema');

// setup
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
  
//routes
router.get('/lessnine', (req, res) => {
  try {
    return db.find({
          selector: {_id: '14COBKINGF7FMRHSTFSLV5601'},
          fields: ['_id', 'description', 'stock'],
          sort: ['_id']
        })
      .then((skus) => res.send(skus))
      .catch((err) => console.log(err))    
} catch (err) {
    console.log(err);
    res.sendStatus(400)
}   
});


router.post('/upload', upload.array('files', 8), (req, res) => {
  try {
 
    let filesRead = 0;
    req.files.forEach((file) => {    
    let filePath = file.path;

    onNewRecord = (col, record) => {
      db.upsert(record._id, (doc) => {
        return Object.assign(doc, record);
      }).catch((err) => {
        console.log('err', err)
      });
      
    };
    
    onError = (error) => {
      console.log(error)
      res.sendStatus(400).send(error);
    }

    done = (linesRead) => {
      filesRead++;
      console.log(`Files read: ${filesRead}`)
      console.log(linesRead)
    
      if (filesRead === req.files.length) {
          res.sendStatus(200)
      }
    }

    const columns = true; 
    const parsed = parseCsv(filePath, file.originalname, columns, onNewRecord, onError, done)

    })
  } catch (err) {
    console.log(err)
    res.sendStatus(400);
  }
});

module.exports = router;


