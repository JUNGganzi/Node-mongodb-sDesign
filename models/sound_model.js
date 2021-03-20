const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongoosePaginate = require('mongoose-paginate-v2')


var soundSchema = new mongoose.Schema({
    accountId:{
        type: mongoose.Schema.Types.ObjectId, // populate
        ref: "User"                           // ObjectId 실제객체로 치환
    },
    fileName: {
        type: String
    },
    filePath: {
        type: String
    },
    soundName: {
        type: String,
        index: true
    },
    category: {
        type: String,
        index: true
    },
    tags: {
        type: Array,
        index: true                                     
    },
    created: {
        type: Number
    },
    isLiked: {
        type: Boolean,
    },
})


soundSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sound',soundSchema )