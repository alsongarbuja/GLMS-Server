const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    level:{
      type:String,
      required:true,
      enum: ['Bachelors','Masters'],
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Category', categorySchema);
