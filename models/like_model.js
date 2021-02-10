const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

var likeSchema = new mongoose.Schema({
    accountId:{
        type: mongoose.Schema.Types.ObjectId, // populate
        ref: "User"                           // ObjectId 실제객체로 치환
    },
    soundId: {
        type: mongoose.Schema.Types.ObjectId, // populate
        ref: "Sound"                           // ObjectId 실제객체로 치환
    },
    created: {
        type: Number
    },
    updated: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
    },
})


// soundSchema.methods.generateToken = function () {
//     const token = jwt.sign(this.accountId, "secretToken");
//     this.token = token;
//     return this.save()
//         .then((sound) => user)
//         .catch((err) => err)
// }


mongoose.model('Like', likeSchema);
module.exports = mongoose.model('Like')