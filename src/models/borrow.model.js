const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Book',
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  borrowDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Borrow', borrowSchema);
