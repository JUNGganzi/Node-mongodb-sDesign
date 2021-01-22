const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    accountEmail : {
        type : String,
        required:true,
    },
    accountName : {
        type : String,
    },
    accountPw : {
        type  :String,
        min : 6,
        max : 24,
    },
    soundId : {
        type : String,
    }
});

module.exports = mongoose.model('User', userSchema); // User의 model 값임을 알려준다