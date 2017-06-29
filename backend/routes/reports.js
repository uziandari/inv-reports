const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');


router.get('/lessnine', (req, res) => {
  const LessNine = mongoose.model('NsInventory');
  try {
      LessNine.aggregate([
      { "$match": { quantity: {$lt: 0} } 
      },
      {
        "$lookup": {
          "from": "cainventories",
          "localField": "_id",
          "foreignField": "_id",
          "as": "cainventory"
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
      { "$unwind" : "$cainventory"}
      ]).exec(function (err, docs) {
          res.json(docs);
      });
} catch (err) {
    console.log(err);
    res.sendStatus(400)
}   
});

module.exports = router;
