const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
  id: ObjectId,
  name: String,
  price:Number,
  average_rating:Number
});

module.exports.Model = mongoose.model("products",Product)