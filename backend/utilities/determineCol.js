const headerMatch = {
  'Receipts': 'Name,Maximum of Date',
  'NsInventory': 'Name,Description,Inventory Location,Location On Hand,CustomUPC,Bin,Backstock,Inline,Drop Ship Item,Maximum of Average Cost',
  'CaInventory': 'Inventory Number,Quantity,Quantity Update Type,DC Quantity,Quantity Pooled Pending Checkout,Quantity Pooled Pending Payment,Quantity Pooled Pending Shipment,FlagDescription,Variation Parent SKU,'
};

const determineCol = (headers) => {
  return Object.keys(headerMatch).find(key => headerMatch[key] === headers);
}

module.exports = determineCol;



