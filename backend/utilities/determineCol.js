const headerMatch = {
  'Receipts': 'Name,Maximum of Date',
  'NsInventory': 'Name,Description,Inventory Location,Location On Hand,CustomUPC,Bin,Backstock,Inline,Drop Ship Item,Maximum of Average Cost'

};

const determineCol = (headers) => {
  return Object.keys(headerMatch).find(key => headerMatch[key] === headers);
}

module.exports = determineCol;



