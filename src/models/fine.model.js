const mongoose = require('mongoose')

const fineSchema = mongoose.Schema({
  fine: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Fine', fineSchema)
