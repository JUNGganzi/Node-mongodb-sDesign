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
    // 인증 불리언 추가예정
});

module.exports = mongoose.model('User', userSchema); // User의 model 값임을 알려준다