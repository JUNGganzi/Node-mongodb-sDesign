// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
// const port = process.env.PORT || 3000;

app.use(express.static('api'));
// Body-parsr 세팅
app.use(bodyparser.urlencoded({ extended : true}));
app.use(bodyparser.json());

mongoose.Promise = global.Promise // node.js의 native Promise 사용

//몽고 db 연결
