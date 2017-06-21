const fs = require('fs');
const Parse = require('csv-parse');

const parseCsv = (filePath, columns, onNewRecord, handleError, done) => {
  let source = fs.createReadStream(filePath);

  let linesRead = 0;

  let parser = Parse({
    delimiter: ',', 
    columns
  });

  parser.on("readable", () => {
    let record;
    while (record = parser.read()) {
      linesRead++;
      onNewRecord(record);
    }
  });

  parser.on("error", (error) => handleError(error));

  parser.on("end", () => done(linesRead));

  source.pipe(parser);
} 


module.exports = parseCsv;
