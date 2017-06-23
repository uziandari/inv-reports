const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const newReceiptsSchema = new Schema({
    _id: String,
    inventoryDetails: Schema.Types.Mixed,
    updated_at : { type: Date, default: Date.now } 
});

const receiptSchema = mongoose.model('Receipts', newReceiptsSchema);
module.exports = receiptSchema;