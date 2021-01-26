// api 컨트롤러 파일임
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // 비밀번호 암호화 모듈
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true }));

app.post('/api/create/account', function(req,res){
    if(!req.body.accountEmail || !req.body.accountName || !req.body.accountPw) {
        return res.send({
            message: "모든 정보를 입력해주세요"
        })
    };
    const user = new User ({
        accountEmail: req.body.accountEmail,
        accountName: req.body.accountName,
        accountPw: bcrypt.hashSync(req.body.accountPw, 10),
        isActive: req.body.isActive
    });
    user
        .save()
        .then(function(data){
            res.send(data)
        })
        .catch(function(err){
            res.send({
                message: err.message || "에러발생"
            })
        });
});    