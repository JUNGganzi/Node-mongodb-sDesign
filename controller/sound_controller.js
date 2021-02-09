const Sound = require('../models/sound_model');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
require('dotenv').config();

const MY_SECRET_KEY = process.env.SECRET_KEY

exports.upload =  async (request, response) => {
    const { soundName,category, tags } = request.body
    const soundfile = request.file
    var { token } = request.headers
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);

    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var accountId = user._id
        var fileName = soundfile.filename
        var filePath = soundfile.path
        var savestatus = await { accountId,soundName,category, tags, fileName,filePath  }
        var sound = await new Sound(savestatus) // formdata 라 json 형태로 못받고 몽고db쿼리문째로 response
        
        sound.created = Date.now()
        
        sound.save()

        // Sound.updateMany(sound,({fileName:filename,filePath:filepath}))
        return response.send({
            result:"파일이 업로드 되었습니다.",
            sound,
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
}  // swagger response 형태가 맘에안듬 후순위

exports.getsoundlist =  async (request, response) => {
    var getlist = request
    var token = request.headers.token  
    
    if (getlist) {
        var user = await User.find()
        var sound = await Sound.find().populate('accountId')
        console.log(sound)
        // return response.send(result)
    } else {
        var user = await Sound.find()
        return response.send(user)
    }
} 

exports.getmysoundlist =  async (request, response) => {
    var token = request.headers.token  
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);
    
    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var result = await Sound.find({accountId:user})
        return response.send({result})
    }
} 
// 왜 accountId 에 user 정보가 들어있지않은지  
// findOne, find, findAndPopulate