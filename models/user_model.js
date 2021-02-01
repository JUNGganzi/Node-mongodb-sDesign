const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const jwt = require("jsonwebtoken");
// import bcrypt from "bcrypt";; Babel을 통해 ES6의 import 구문을 사용해도 에러가 뜨지않음

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
// save 전에 비밀번호 암호화 
userSchema.pre("save", function(next){ // next 콜백은 save 전에 처리할거 다 하고 save 로 이동
    // .pre 를 통해 save 가 동작하기 전에 처리할 내용 설정
    var user = this;
    if (!user.isModified("accountPw")) { // user 내의 accountPw 와 대조
        return next();
    } else {
        user.accountPw = bcrypt.hashSync(user.accountPw);
        return next();
    }
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign(this._id, "secretToken");
    this.token = token;
    return this.save()
        .then((user) => user)
        .catch((err) => err)
}



userSchema.set('timestamps', true) // 새 테이블 생성될때마다 created,updated 자동으로 현재시각 저장

mongoose.model('User', userSchema);
module.exports = mongoose.model('User')
