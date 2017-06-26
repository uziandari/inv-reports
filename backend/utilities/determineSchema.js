const collectionMatch = {
  'Receipts': {_id: 'Name',
                receiptDate: 'Maximum of Date',
                updated_at: Date.now()
              }
};

const determineSchema = (collectionName) => {
  return collectionMatch[collectionName];
}

module.exports = determineSchema;