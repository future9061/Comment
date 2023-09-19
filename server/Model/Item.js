const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  content: String,
  ItemNum: Number,
  date: String,
  time: String,
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item 