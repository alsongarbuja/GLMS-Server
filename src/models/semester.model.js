const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Level',
    required: true,
  },
},
{
  timestamps: true,
})

module.exports = mongoose.model('Semester', semesterSchema);
