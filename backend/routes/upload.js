const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const mongoose = require('mongoose');


//utility import
const parseCsv = require('../utilities/parseCsv');
const fillSchema = require('../utilities/fillSchema');

// setup
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

//routes
router.get('/', function(req, res) {
    res.json({ message: 'This is the api' });   
});

router.post('/upload', upload.array('files', 8), (req, res) => {
  try {
    let filesRead = 0;
    req.files.forEach((file) => {    
    let filePath = file.path;

    onNewRecord = (col, record) => {
      const Collection = mongoose.model(col);
      const schema = fillSchema(col, record);
      Collection.findOneAndUpdate (
          {_id: schema._id},
          schema,
          {upsert: true, new: true, runValidators: true}, // options
          function (err, res) { 
              if (err) {
                console.log(err)
              }
          }
      );
    };
    
    onError = (error) => {
      console.log(error)
      res.sendStatus(400);
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

router.get('/inventory/:inv_id', (req, res) => {
  try {
    const NsInventory = mongoose.model('NsInventory');
    NsInventory.aggregate([
      { "$match": { "_id": req.params.inv_id } },
      {
        "$lookup": {
          "from": "cainventories",
          "localField": "_id",
          "foreignField": "_id",
          "as": "cainventory"
          }
      },
      {
        "$lookup": {
          "from": "receipts",
          "localField": "_id",
          "foreignField": "_id",
          "as": "newreceipt"
        }
      },
      { "$unwind" : "$cainventory"}
    ]).exec(function (err, docs) {
        console.log(docs)
        res.json(docs);
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(400)
  }
});

module.exports = router;


