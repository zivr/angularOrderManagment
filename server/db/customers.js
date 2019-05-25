const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  }
},{
    collection: 'customers'
});

module.exports = mongoose.model('Customers', CustomersSchema);