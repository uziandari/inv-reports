const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// mongoose setup
require( './db/index' );

//utility import
const cleanFolder = require('./utilities/cleanFolder');
const parseCsv = require('./utilities/parseCsv');
const fileFilter = require('./utilities/fileFilter');
const fillSchema = require('./utilities/fillSchema');

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
    let filesRead = 0;
    req.files.forEach((file) => {    
    let filePath = file.path;
    
    // if (!file.originalname.match(/\.(csv)$/)) {
    //   onError(`FIle ${file.originalname} is the wrong file type. Only csv files are allowed.`);
    // }   

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
    
    onError = (error) => console.log(error);

    done = (linesRead) => {
      filesRead++;
      console.log(`Files read: ${filesRead}`)
      console.log(linesRead)
      
      if (filesRead === req.files.length) {
          res.sendStatus(200)
      }
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
        console.log(req)
    } catch (err) {
        res.sendStatus(400);
    }
})

const port = process.env.PORT || 3001

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});