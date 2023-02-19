const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Book',
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  ticket_number: {
    type: Number,
    required: true,
  },
  canVisit: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Queue', queueSchema);
