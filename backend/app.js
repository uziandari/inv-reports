const express = require('express');
const cors = require('cors');
const path = require('path');

// mongoose setup
require( './db/index' );

//routes import
const uploadRoutes = require('./routes/upload');

//utility import
const cleanFolder = require('./utilities/cleanFolder');

// setup
const UPLOAD_PATH = 'uploads';

// app
const app = express();
app.use(cors());
app.use('/api', uploadRoutes);


//clean db and folder
cleanFolder(UPLOAD_PATH);

const port = process.env.PORT || 3001

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});