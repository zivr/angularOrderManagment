const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  customer: {
    type: Schema.ObjectId,
    ref: 'Customers',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
},{
    collection: 'orders'
});

module.exports = mongoose.model('Orders', OrdersSchema);