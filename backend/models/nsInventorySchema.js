const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const nsInventorySchema = new Schema({
     _id: String,
    inventoryDetails: Schema.Types.Mixed,
    updated_at : { type: Date, default: Date.now } 
});

const inventorySchema = mongoose.model('NsInventory', nsInventorySchema);
module.exports = inventorySchema;
