const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

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
        type: String
    },
    category: {
        type: String
    },
    tags: {
        type: Array
    },
    created: {
        type: Number
    },
})


// soundSchema.methods.generateToken = function () {
//     const token = jwt.sign(this.accountId, "secretToken");
//     this.token = token;
//     return this.save()
//         .then((sound) => user)
//         .catch((err) => err)
// }



mongoose.model('Sound', soundSchema);
module.exports = mongoose.model('Sound')