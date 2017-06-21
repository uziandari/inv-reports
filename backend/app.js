const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Loki = require('lokijs');

//utility import
const loadCollection = require('./utilities/loadCollection');
const cleanFolder = require('./utilities/cleanFolder');
const parseCsv = require('./utilities/parseCsv');

// setup
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'inventory';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });


// app
const app = express();
app.use(cors());

//clean db and folder
cleanFolder(UPLOAD_PATH);

app.post('/files/upload', upload.array('files', 8), async (req, res) => {
  try {
    const col = await loadCollection(COLLECTION_NAME, db)
    req.files.forEach((file) => {    
        let filePath = file.path;
    
        onNewRecord = (record) => {
            col.insert({sku: record['Name'], receivedDate: record['Maximum of Date']})
        };
        
        onError = (error) => console.log(error);

        done = (linesRead) => {
            console.log(linesRead)
            db.saveDatabase();
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
        const col = await loadCollection(COLLECTION_NAME, db);
        res.send(col.data);
    } catch (err) {
        res.sendStatus(400);
    }
})

const port = process.env.PORT || 3001

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});