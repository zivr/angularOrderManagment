const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  amount: {
    type: Number
  }
},{
    collection: 'business'
});

module.exports = mongoose.model('Orders', OrdersSchema);