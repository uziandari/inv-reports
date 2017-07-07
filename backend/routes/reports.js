const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');


router.get('/lessnine', (req, res) => {
  const LessNine = mongoose.model('CaInventory');
  try {
    LessNine.aggregate([
      { "$match": { quantityAvailable: {$lt: 10, $gt: 0}, flag: {$not: /briantest|inline|final/i} } },
      //{ "$match": {"_id": "17PRDHOLLOW11111111YLW01"}},
      {
        "$lookup": {
          "from": "nsinventories",
          "localField": "_id",
          "foreignField": "_id",
          "as": "nsinventory"
          }
      },
      {
        "$lookup": {
          "from": "receipts",
          "localField": "_id",
          "foreignField": "_id",
          "as": "newreceipt"
        }
      },
      { "$unwind": {"path": "$newreceipt", "preserveNullAndEmptyArrays": true }},
      { "$unwind": {"path": "$nsinventory", "preserveNullAndEmptyArrays": true }},
      { "$match": {"nsinventory.invLocation": {$ne: "NORFOLK"} } },
      { "$match": {"newreceipt.receiptDate": {"$exists" : false} } }
    ])
    .exec(function (err, docs) {
        res.json(docs);
    });
} catch (err) {
    console.log(err);
    res.sendStatus(400)
}   
});

module.exports = router;
