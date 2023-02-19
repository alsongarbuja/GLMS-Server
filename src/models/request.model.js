const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  bookId:{
    type: mongoose.SchemaTypes.ObjectId,
    required:true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
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
