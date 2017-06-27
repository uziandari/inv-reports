'use strict'

const fs = require('fs');
const Parse = require('csv-parse');
const determineCol = require('./determineCol');
const fileFilter = require('./fileFilter');


const parseCsv = (filePath, fileName, columns, onNewRecord, handleError, done) => {
  let source = fs.createReadStream(filePath);
  
  let linesRead = 0;

  let delimeter = fileFilter(fileName);

  let parser = Parse({
    delimiter: delimeter, 
    columns
  });

  parser.on("readable", () => {
    let record;
    let collectionName = determineCol(parser.options.columns.toString());
    while (record = parser.read()) {
      linesRead++;
      onNewRecord(collectionName, record);
    }
  });

  parser.on("error", (error) => handleError(error));

  parser.on("end", () => done(linesRead));

  source.pipe(parser);
} 


module.exports = parseCsv;
