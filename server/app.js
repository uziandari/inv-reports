const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Loki = require('lokijs');

//utility import
const loadCollection = require('./utilities/loadCollection');
const cleanFolder = require('./utilities/cleanFolder');

// setup
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'inventory';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });


// app
const app = express();
app.use(cors());

cleanFolder(UPLOAD_PATH);

app.post('/files/upload', upload.array('files', 8), async (req, res) => {
  try {
    const col = await loadCollection(COLLECTION_NAME, db)
    let data = [].concat(col.insert(req.files));
    db.saveDatabase();
    res.send(data.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname })));
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