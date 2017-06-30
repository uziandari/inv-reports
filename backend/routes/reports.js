const express = require('express');
const router = express.Router(); 


router.get('/lessnine', (req, res) => {
  try {
      res.json({"message": "here be reports"})
} catch (err) {
    console.log(err);
    res.sendStatus(400)
}   
});

module.exports = router;
