const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    book:{
        type:{
            bookId: mongoose.SchemaTypes.ObjectId,
            name: String,
            authorName: String,
            bookType: String,
        },
        required:true,
    },
    user:{
        type:{
            userId: mongoose.SchemaTypes.ObjectId,
            name: String,
            level: String,
        },
        required:true,
    },
    request_type: {
        type: String,
        required: true,
        enum: ['new request', 'renew request'],
    },
    status: {
        type: String,
        enum: ['open', 'verified','cancelled'] ,
        default: 'open',
    },
    cancelled_reason: {
        type: String,
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Request', requestSchema);
