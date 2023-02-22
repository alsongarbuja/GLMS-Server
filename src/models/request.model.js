const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  bookId:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Book',
    required:true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required:true,
  },
  request_type: {
    type: String,
    required: true,
    enum: ['new request', 'renew request'],
  },
  status: {
    type: String,
    enum: ['open', 'verified','cancelled'] ,
    default: 'open',
  },
  cancelled_reason: {
    type: String,
  }
},
{
  timestamps: true,
})

module.exports = mongoose.model('Request', requestSchema);
