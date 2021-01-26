const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({ // schema 를 사용해 테이블,컬렉션 타입 속성 정의하기
    accountEmail : {
        desc: "useremail",
        type: String,
        required:true,
    },
    accountName : {
        desc: "username",
        type : String,
    },
    accountPw : {
        desc: "userpassword",
        type: String,
        min : 6,
        max : 24,
    },
    isActive : {
        desc: "vaildaccount",
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema); // User의 model 값임을 알려준다