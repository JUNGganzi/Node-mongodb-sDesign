const express = require('express'); // rest api 필수템
const mongoose = require('mongoose'); // mongodb 연동 필수템 
const bodyparser = require('body-parser');
const app = express();
const User = require('./models/User');
require('dotenv').config({path:'variables.env'}) // variables.env 에 mongoDB 관련 비밀번호와 URL 노출방지를 위해 .env 파일생성 및 dotenv 설치 및 연동


app.use(express.static('api'));
// Body-parsr 세팅 - bodyParser : POST 방식을 사용하게 될 경우 Request Data의 Body에서 데이터를 추출해야함.
// 그 기능을 편리하게 해줌. Express를 사용할 경우 별도로 Load 하지 않아도 됨
app.use(bodyparser.urlencoded({ extended : true}));
app.use(bodyparser.json());

app.listen(3000,function(){
    console.log('서버가동중')
});

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {  // process.env.MONGODB_URL 만든 .env 파일안에 MONGODB_URL 전달
    if(err) {                             // {useNewUrlParser: true, useUnifiedTopology: true} 없으면 에러뜬다 69,74번 번갈아보면서확인
        console.log(err);
    } else  {
        console.log('연결성공')
    }
});

app.get('/', function(req, res){
    let newUser = new User();
    newUser.email = 'wjdwjd1501@gmail.com';
    newUser.name = 'wjdwjddnjs';
    newUser.password = '12341234';
    newUser.save()
        .then(function(user){
            console.log(user);
            res.json({
                message:'User 생성완료'
            })
        })
        .catch(function(err){
            res.json({
                message : 'User 생성불가!'
            })
        })
});
