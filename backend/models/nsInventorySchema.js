const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const nsInventorySchema = new Schema({
  _id: String,
  description: String,
  invLocation: {type: String, index: true},
  quantity: {type: Number, index: true},
  upc: {type: String, index: true},
  bin: {type: String, index: true},
  backStock: {type: String, index: true},
  inline: {type: String, index: true},
  dropShip: {type: String, index: true},
  cost: Number,
  updatedAt : { type: Date, default: Date.now } 
});

const inventorySchema = mongoose.model('NsInventory', nsInventorySchema);
module.exports = inventorySchema;


 