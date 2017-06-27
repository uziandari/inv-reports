const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const caInventorySchema = new Schema({
  _id: String,
  quantityAvailable: Number,
  pendingCheckout: Number,
  pendingPayment: Number,
  pendingShipment: Number,
  flag: String,
  parentSku: String,
  updatedAt : { type: Date, default: Date.now } 
});

const caSchema = mongoose.model('CaInventory', caInventorySchema);
module.exports = caSchema;
