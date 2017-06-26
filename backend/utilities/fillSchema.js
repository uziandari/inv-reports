const fillSchema = (collectionName, record) => {
  switch (collectionName) {
    case "Receipts":
    return ({
      _id: record['Name'],
      receiptDate: record['Maximum of Date'],
      updatedAt: Date.now()
    });
    case "NsInventory":
    return ({
      _id: record['Name'],
      description: record['Description'],
      invLocation: record['Inventory Location'],
      quantity: record['Location On Hand'],
      upc: record['CustomUPC'],
      bin: record['Bin'],
      backStock: record['Backstock'],
      inline: record['Inline'],
      dropShip: record['Drop Ship Item'],
      cost: record['Maximum of Average Cost'],
      updatedAt: Date.now()
    });
    default:
      return null;
  }
}

module.exports = fillSchema;

  //'Name,Description,Inventory Location,Location On Hand,CustomUPC,Bin,Backstock,Inline,Drop Ship Item,Maximum of Average Cost'
