const mongoose = require('mongoose');

const limitSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
    },
    level:{
        type: String,
        enum: ['Bachelors', 'Masters'],
        required: true,
    },
    sub_quantity:[{
        quantity:{
            type:Number,
            required:true,
        },
        type:{
            type:String,
            enum:['reference', 'text-book', 'others'],
            required:true,
        }
    }]
},
{
    timestamps: true,
})

module.exports = mongoose.model('Limit', limitSchema);
