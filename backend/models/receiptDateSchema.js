const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const newReceiptsSchema = new Schema({
     _id: String,
    receiptDate: {type: Date, index: true},
    updatedAt : { type: Date, default: Date.now } 
});

const receiptSchema = mongoose.model('Receipts', newReceiptsSchema);
module.exports = receiptSchema;

