const Sound = require('../models/sound_model');
const User = require('../models/user_model');
const Like = require('../models/like_model')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path');
const { request } = require('http');
const { response } = require('express');
require('dotenv').config();

const MY_SECRET_KEY = process.env.SECRET_KEY

exports.like = async (request, response) => {
    var { soundId }  = request.body  // properties body 요청
    var { token } = request.headers 
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);

    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var sound = await Sound.findOne({_id:soundId})
        var accountId = user._id // _id = User.objectid
        var soundid = sound._id // _id = Sound.objectid

        var like = new Like();

        like.accountId = accountId
        like.soundId = soundid
        like.created = Date.now() // created time 설정
        like.updated = Date.now() // updated time 설정
        like.isDeleted = false

        like.save()

        var isLikeid = like.soundId
        var test = await Sound.updateOne({_id:isLikeid},{$set:{isLiked:true}});

        response.send(like)
    }
}