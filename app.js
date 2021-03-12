const express = require('express');
const app = express();
const mongoose = require('mongoose')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser");
const http = require('http')
const https = require('https')
const cors = require('cors')


require('dotenv').config({path:'variables.env'})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", require("./routes/user_routes"));
app.use("/api", require("./routes/sound_routes"));
app.use("/api", require("./routes/like_routes"));


app.listen(3000, function(err){
    console.log("서버구동중")
});

const options = {  // swagger ui 세팅
    definition: {
        swagger : "2.0",
        info : {
            title : 'sDesign API 문서',
            version : '1.0',
            // description : '냉무',
        },
    },
    apis : ['./routes/index.js'],
    schemas: ['http','https'],
};

const specs = swaggerJsdoc(options);  // swagger 연결
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
        // index 사용할려면 세팅해야함
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err) {  // process.env.MONGODB_URL 만든 .env 파일안에 MONGODB_URL 전달
    if(err) {                             // {useNewUrlParser: true, useUnifiedTopology: true} 없으면 에러뜬다 69,74번 번갈아보면서확인
        console.log(err);
    } else  {
        console.log('연결성공')
    }
});

module.exports = app;