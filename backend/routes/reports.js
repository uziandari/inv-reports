const express = require('express');
const router = express.Router();

const db = require('PouchDB');


router.get('/lessnine', (req, res) => {
  try {
    db.get('14COBKINGF7FMRHSTFSLV5601')
      .then((skus) => res.send(skus) )     
} catch (err) {
    console.log(err);
    res.sendStatus(400)
}   
});

module.exports = router;
