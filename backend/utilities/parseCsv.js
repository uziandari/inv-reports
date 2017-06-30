'use strict'

const fs = require('fs');
const Parse = require('csv-parse');
const fileFilter = require('./fileFilter');
const determineFile = require('./determineFile');
const determineRecord = require('./determineRecord');

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
    const col = determineFile(parser.options.columns.toString());
    while (record = parser.read()) {
      linesRead++;
      const inputRecord = determineRecord(col, record);
      onNewRecord(col, inputRecord);
    }
  });

  parser.on("error", (error) => handleError(error));

  parser.on("end", () => done(linesRead));

  source.pipe(parser);
} 


module.exports = parseCsv;
