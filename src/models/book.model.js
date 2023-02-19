const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  secondary_title: {
    type: String,
  },
  ISBN_number: {
    type: String,
  },
  Barcode_number: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  borrowed_quantity: {
    type: Number,
    default: 0,
  },
  book_copies: {
    type: [String],
    default: [],
  },
  semester: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Semester',
    default: null,
  },
  type: {
    type: String,
    enum: ['reference','text-book', 'others'],
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  edition: {
    type: String,
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Book', bookSchema);
