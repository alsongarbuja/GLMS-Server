const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['Bachelors','Masters'],
    required: true,
  },
  limit: {
    type: [{
      quantity: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        enum: ['reference', 'text-book', 'others', 'total'],
        required: true,
      }
    }],
    required: true,
  },
  fine: {
    type: Number,
    required: true,
  },
  isFineActive: {
    type: Boolean,
    default: true,
  },
  turnedOffDate: {
    type: Date,
    default: new Date(),
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Level', levelSchema);
