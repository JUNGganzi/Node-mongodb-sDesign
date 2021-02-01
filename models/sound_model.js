const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

var soundSchema = new mongoose.Schema({
    accountId:{
        type: String
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
})


soundSchema.methods.generateToken = function () {
    const token = jwt.sign(this.accountId, "secretToken");
    this.token = token;
    return this.save()
        .then((sound) => user)
        .catch((err) => err)
}


soundSchema.set('timestamps', true) 

mongoose.model('Sound', soundSchema);
module.exports = mongoose.model('Sound')