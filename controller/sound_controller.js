const Sound = require('../models/sound_model');
const User = require('../models/user_model');
const Like = require('../models/like_model');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path');
const { BADNAME } = require('dns');
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
        return response.send({
            result:"파일이 업로드 되었습니다.",
            sound,
        })
    } 
}


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
    const { next, previous } = request.query
    const query = {}
    const myCustomLabels = {
        totalDocs: 'itemCount',
        docs: 'fileList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',   
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'paginator',
    }
    var popul = ({ path: 'accountId', select: 'accountEmail accountName accountImg' });
    const options = {
        limit: 4,
        customLabels: myCustomLabels,
        sort: {_id:1},
        populate: popul,
    };                                                      
    var getlist = request                                                                                                                                                                                                                       
    if (getlist)   
    var result = await Sound.paginate(query, options, next, previous)
    response.send({
        result
    })
        // var user = await Sound.find().populate({
        //     path: 'accountId',
        //     select:['accountEmail', 'accountName','accountImg']}
        // )

        

}                                   


exports.getmysoundlist =  async (request, response) => {                                    
    var token = request.headers.token  
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);                     
    
    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var sound = await Sound.find({accountId:user}).populate({
            path: 'accountId',
            select:['accountEmail', 'accountName','accountImg']})
        return response.send(sound)
    }
} 


exports.search =  async (request, response) => {
    var { keyword } = request.query 
    

    if (keyword) {
        var tags = await Sound.find({ tags: new RegExp(keyword) })
        var sound = await Sound.find({ soundName: new RegExp(keyword)})
        var category = await Sound.find({ category: new RegExp(keyword)})
        var result = await [tags, sound, category]
        response.send(result)
    }
} 

exports.mylike =  async (request, response) => {
    var { token } = request.headers 
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);
    
    if (decoded_token) {
        var likeid = await Like.find({accountId:decoded_token.user}).populate({
            path: 'soundId'
        })
        // var sound = await likeid.find({_id:likeid.soundId,isLiked:true}).populate({
        //     path: 'accountId',
        //     select:'accountEmail accountName accountImg'})
            response.send(likeid)
    }
}
