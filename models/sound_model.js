const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var mongoosePaginate = require('mongoose-paginate-v2')


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


// soundSchema.methods.generateToken = function () {
//     const token = jwt.sign(this.accountId, "secretToken" );
//     this.token = token;
//     return this.save()
//         .then((sound) => user)
//         .catch((err) => err)
// }

soundSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sound',soundSchema )