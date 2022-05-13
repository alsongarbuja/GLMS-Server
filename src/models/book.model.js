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
        type: [
            {
                bookId: {
                    type: String,
                    required: true,
                },
            }
        ]
    },
    in_queue: {
      type: [
          {
              userId: mongoose.SchemaTypes.ObjectId,
              name: String,
              level: String,
              queue_ticket_number: Number,
          }
      ],
      default: [],
    },
    category: {
        type: String,
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
