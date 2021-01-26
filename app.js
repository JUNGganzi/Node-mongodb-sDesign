
var express = require('express'); // rest api 필수템
var mongoose = require('mongoose'); // mongodb 연동 필수템
// var bcrypt = require('bcryptjs'); // 비밀번호 암호화 모듈
// swagger UI 세팅
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express'); 
const swaggerJSDoc = require('swagger-jsdoc');

// 
var bodyparser = require('body-parser');
var app = express();
var User = require('./models/User');
require('dotenv').config({path:'variables.env'}) // variables.env 에 mongoDB 관련 비밀번호와 URL 노출방지를 위해 .env 파일생성 및 dotenv 설치 및 연동


app.use(express.static('api'));
// Body-parsr 세팅 - bodyParser : POST 방식을 사용하게 될 경우 Request Data의 Body에서 데이터를 추출해야함.
// 그 기능을 편리하게 해줌. Express를 사용할 경우 별도로 Load 하지 않아도 됨
app.use(bodyparser.urlencoded({ extended : true}));
app.use(bodyparser.json());

app.listen(3000,function(){
    console.log('서버가동중')
});

// swagger 변수설정
const options = {
    definition: {
        openapi : '3.0.0',
        info : {
            title : 'sDesign API 문서',
            version : '1.0',
            // description : '냉무',
        },
        host : 'localhost:3000',
        basepath : '/',
    },
    apis : ['./routes/index.js'],
    schemas: ['http','https'],
    definitions: {
        type : 'User', // 모델 정의했는데 쓸줄 모름 젠장
        properties : {
            accountEmail : {type : 'string'},
            accountPw : {type : 'string'},
            accountName : {type : 'string'}
        }
    }
};

const specs = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// mongoose 연결
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {  // process.env.MONGODB_URL 만든 .env 파일안에 MONGODB_URL 전달
    if(err) {                             // {useNewUrlParser: true, useUnifiedTopology: true} 없으면 에러뜬다 69,74번 번갈아보면서확인
        console.log(err);
    } else  {
        console.log('연결성공')
    }
});

app.get('/',function(req, res){
    res.redirect('/api/docs')
});


app.post('/api/create/account', function(req,res){
    User.create(req.body)
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.status(500).send(err)
        })
});