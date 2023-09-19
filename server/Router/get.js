var express = require('express');
var router = express.Router();
const Item = require("../Model/Item.js")

router.get("/read", (req, res) => {
  Item.find()
    .then((doc) => { res.send({ success: true, ItemList: doc }) })
    .catch((err) => console.log(err))
})

module.exports = router