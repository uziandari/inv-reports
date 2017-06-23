const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// mongoose setup
require( './db/index' );

//utility import
const loadCollection = require('./utilities/loadCollection');
const cleanFolder = require('./utilities/cleanFolder');
const parseCsv = require('./utilities/parseCsv');
const fileFilter = require('./utilities/fileFilter');

// setup
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration


// app
const app = express();
app.use(cors());

//clean db and folder
cleanFolder(UPLOAD_PATH);

app.post('/files/upload', upload.array('files', 8), (req, res) => {
  try {
    req.files.forEach((file) => {    
    let filePath = file.path;
    
    // if (!file.originalname.match(/\.(csv)$/)) {
    //   onError(`FIle ${file.originalname} is the wrong file type. Only csv files are allowed.`);
    // }   

    onNewRecord = (col, record) => {
      const Collection = mongoose.model(col);
      if (record[Object.keys(record)[0]]) {
        //Model.update({_id: id}, obj, {upsert: true}, function (err) {...});
      }
      new Collection({
        _id: record[Object.keys(record)[0]],
        inventoryDetails: record,
        updated_at: Date.now()
      }).update(( err, receipt, count ) => {
        if (err) {
          onError(err)
        }
      });
    };
    
    onError = (error) => console.log(error);

    done = (linesRead) => {
      console.log(linesRead)
      res.sendStatus(200)
    }

    const columns = true; 
    const parsed = parseCsv(filePath, columns, onNewRecord, onError, done)

    })
  } catch (err) {
    res.sendStatus(400);
  }
})

app.get('/data', async (req, res) => {
    try {
        Receipts.find({}, function(err, docs) {
            if (!err){ 
                console.log(docs);
                res.send(docs)
            } else {throw err;}
        });
    } catch (err) {
        res.sendStatus(400);
    }
})

const port = process.env.PORT || 3001

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});