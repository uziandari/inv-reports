const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const newReceiptsSchema = new Schema({
    name : String,
    receiptDate: Date,
    updated_at : { type: Date, default: Date.now } 
});


const receiptSchema = mongoose.model('Receipts', newReceiptsSchema);

module.exports = receiptSchema;