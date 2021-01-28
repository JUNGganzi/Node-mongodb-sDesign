const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    accountEmail:{
        type: String,
        required: true
    },
    accountPw:{
        type: String,
        required: true
    },
    accountName:{
        type: String,
        required:true
    },
    isAcceptEmail:{
        type: Boolean,
        default: false,
    },
    isExit : {
        type: Boolean,
        default: false,
    },
});

userSchema.set('timestamps', true)

mongoose.model('User', userSchema);

module.exports = mongoose.model('User')
