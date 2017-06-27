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
    case "CaInventory":

      let pulledQuantity = record['DC Quantity'].match((/\d+$/));

      if (pulledQuantity) {
          quantity = parseInt(pulledQuantity[0], 10);
      }

      return ({
        _id: record['Inventory Number'],
        quantityAvailable: quantity,
        pendingCheckout: record['Quantity Pooled Pending Checkout'],
        pendingPayment: record['Quantity Pooled Pending Payment'],
        pendingShipment: record['Quantity Pooled Pending Shipment'],
        flag: record['FlagDescription'],
        parentSku: record['Variation Parent SKU'],
        updatedAt: Date.now() 
      });
    default:
      return null;
  }
}

module.exports = fillSchema;

