const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-upsert'));


//utility import
const parseCsv = require('../utilities/parseCsv');
const fillSchema = require('../utilities/fillSchema');

// setup
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
const db = new PouchDB('inventory');

// router.get('/lessnine', (req, res) => {
//   try {
//     db.get('02TAY5CARTB11111111BKW01')
//       .then((doc) => {
//       res.send(doc)
//     })
// } catch (err) {
//     console.log(err);
//     res.sendStatus(400)
// }   
// });

//routes
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


