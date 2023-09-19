var express = require('express');
var router = express.Router();
const Item = require("../Model/Item.js")

router.delete('/delete', (req, res) => {
  let ItemNum = Number(req.body.ItemNum)

  Item.deleteOne({ ItemNum: ItemNum })
    .then(() => {
      Item.find()
        .then((doc) => { res.send({ success: true, ItemList: doc }) })
    })
    .catch((err) => console.log(err))
})

module.exports = router