const express = require('express');
const router = express.Router();
const db = require('../db'); 


router.get('/lessnine', (req, res) => {
  try {
    db.get('02TTKT2CART11111111BGL01')
      .then((skus) => res.send(skus) )     
} catch (err) {
    console.log(err);
    res.sendStatus(400)
}   
});

module.exports = router;
