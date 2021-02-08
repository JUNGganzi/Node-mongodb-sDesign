const Sound = require('../models/sound_model');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
require('dotenv').config();

const MY_SECRET_KEY = process.env.SECRET_KEY

exports.upload =  async (request, response) => {
    const { fileName } = request.file
    const { soundName,category, tags } = request.body
    var token = request.headers.token  
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);
    
    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var accountId = user._id
        var savestatus = await { accountId,soundName,category, tags, fileName }
        var sound = await new Sound(savestatus) // formdata 라 json 형태로 못받고 몽고db쿼리문째로 response
        
        sound.save()
        
        var _id = sound._id
        var uploadStatus = await { _id,accountId,soundName,category, tags, fileName }
        return response.send({
            result:"파일이 업로드 되었습니다.",
            // soundId:sound._id, // soundid 가 맞는지 체크 해야함
            uploadStatus,
        })
    } 
}
// filename filepath 애로사항있음

exports.remove =  async (request, response) => {
    var soundId = request.body
    var token = request.headers.token  
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);
    
    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var sound = await Sound.findOne({accountId:user})
        var remove = await sound.deleteOne({_id:soundId})
        return response.send({remove})
    } 
}  // swagger response 형태가 맘에안듬
