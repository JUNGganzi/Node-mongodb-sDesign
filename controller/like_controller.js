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
    var decoded_token = jwt.verify(token, MY_SECRET_KEY)

    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var sound = await Sound.findOne({_id:soundId})
        var soundid = sound._id
        var like_check = await Like.findOne({soundId:soundid, accountId:user, isDeleted:false})
        if (!like_check) {
            var user = await User.findOne({_id:decoded_token.user})
            
            var accountId = user._id // _id = User.objectid
             // _id = Sound.objectid

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
        } else {
            var like_delete = await Like.updateOne({accountId:user}, {$set:{isDeleted:true}})
            response.send(like_delete)
        }
    // } if(decoded_token) {
    //     var user = await User.findOne({_id:decoded_token.user})
    //     var sound = await Sound.findOne({_id:soundId})
    //     var accountId = user._id 
    //     var soundid = sound._id 

    //     like.soundId = soundid

    //     var isLikeid = like.soundId
    //     var test2 = await Like.findOne({soundId:soundid, isDeleted:false})

    //     var test3 = await test2.

    //     response.send(test3)
    // }
    }
}