const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Rating = new Schema({
  id: ObjectId,
  product:{type:Schema.Types.ObjectId, ref: 'products' },
  rating:Number
});

module.exports.Model = mongoose.model("ratings",Rating)