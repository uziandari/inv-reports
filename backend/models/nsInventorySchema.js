const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const nsInventorySchema = new Schema({
  _id: String,
  description: String,
  invLocation: String,
  quantity: Number,
  upc: String,
  bin: String,
  backStock: String,
  inline: String,
  dropShip: String,
  cost: Number,
  updatedAt : { type: Date, default: Date.now } 
});

const inventorySchema = mongoose.model('NsInventory', nsInventorySchema);
module.exports = inventorySchema;


 