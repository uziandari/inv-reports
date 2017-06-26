const fs = require('fs');
const Parse = require('csv-parse');
const determineCol = require('./determineCol');
const determineSchema = require('./determineSchema');

const parseCsv = (filePath, columns, onNewRecord, handleError, done) => {
  let source = fs.createReadStream(filePath);
  
  let linesRead = 0;

  let parser = Parse({
    delimiter: ',', 
    columns
  });

  parser.on("readable", () => {
    let record;
    let collectionName = determineCol(parser.options.columns.toString());
    let schema = determineSchema(collectionName);
    while (record = parser.read()) {
      linesRead++;
      onNewRecord(collectionName, record, schema);
    }
  });

  parser.on("error", (error) => handleError(error));

  parser.on("end", () => done(linesRead));

  source.pipe(parser);
} 


module.exports = parseCsv;
