var express = require('express');
var router = express.Router();
const Item = require("../Model/Item.js")
const Counter = require("../Model/Counter.js")

router.post("/submit", (req, res) => {

  Counter.findOne({ name: "counter" })
    .then((counter) => {
      req.body.ItemNum = counter.ItemNum
      const commentItem = new Item(req.body)
      commentItem.save()
        .then(() => {
          Counter.updateOne({ name: "counter" }, { $inc: { ItemNum: 1 } })
            .then(() => {
              Item.find()
                .then((doc) => { res.send({ success: true, ItemList: doc }) })
            })
        })
    })
    .catch((err) => console.log(err))
})

module.exports = router