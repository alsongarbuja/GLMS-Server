const mongoose = require('mongoose')

const fineSchema = mongoose.Schema({
  fine: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  turnedOffDate: {
    type: Date,
    default: new Date(),
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Fine', fineSchema)
