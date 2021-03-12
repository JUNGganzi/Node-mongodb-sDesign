const Sound = require('../models/sound_model');
const User = require('../models/user_model');
const Like = require('../models/like_model');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path');
const { BADNAME } = require('dns');
const { request } = require('http');
const { response } = require('express');
require('dotenv').config();

const MY_SECRET_KEY = process.env.SECRET_KEY

exports.upload =  async (request, response) => {

    const { soundName,category, tags } = request.body

    const soundfile = request.file

    var { token } = request.headers        

    var decoded_token = jwt.verify(token, MY_SECRET_KEY); // 토큰 디코드
    if (!soundfile) return response.send("파일을 업로드 해주세요.");
    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user}) // 디코드 토큰 값을 User._id 찾아온다
        var accountId = user._id
        var fileName = soundfile.filename 
        var filePath =  `https://jungganzi.xyz/api/get/file/${fileName}`; // 파일경로 설정  해당경로에 접속시 해당 파일 열어볼수있게 
        var savestatus = await { accountId, soundName, category, tags, fileName, filePath  }
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

    // const query = {}  // pagianate promise usage 존재
    
    const myCustomLabels = {  // 커스텀으로 생성가능하지만 여기서는 하지않음
        totalDocs: 'totalCount',
        docs: 'fileList',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        hasNextPage: 'hasNext',
        hasPrevPage : 'hasPrevious',
        totalPages: 'pageCount',
        meta: 'paginator',
    }

    // 클라단에서 무한스크롤링을 구현하기위해 next  페이징 이동구현

    var popul = ({ path: 'accountId',
        select: 'accountEmail accountName accountImg' }); // populate options 

    const options = {
        page : parseInt(next, 10) || 1,
        limit: 10,
        customLabels: myCustomLabels, // 커스텀 생성시 추가내역
        sort: {created: -1 },
        populate: popul,
    };                        
    var result = await Sound.paginate({}, options, next, previous)
    var getlist = request        

    if (getlist)   
    

    response.send({
        result,
        // pagiantor: {
        //     options
        // }
    })
        // var user = await Sound.find().populate({
        //     path: 'accountId',
        //     select:['accountEmail', 'accountName','accountImg']}
        // )

        

}                                   


exports.getmysoundlist =  async (request, response) => {

    var token = request.headers.token  

    var decoded_token = jwt.verify(token, MY_SECRET_KEY);   

    const { next, previous } = request.query

    const myCustomLabels = {  // 커스텀으로 생성가능하지만 여기서는 하지않음
        totalDocs: 'totalCount',
        docs: 'fileList',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        hasNextPage: 'hasNext',
        hasPrevPage : 'hasPrevious',
        totalPages: 'pageCount',
        meta: 'paginator',
    }

    var popul = ({ path: 'accountId',
        select: 'accountEmail accountName accountImg' }); // populate options

    const options = {
        page : parseInt(next, 10) || 1,
        limit: 10,
        customLabels: myCustomLabels,
        sort: {created: -1 },
        populate: popul,
    };                                    

    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        var result = await Sound.paginate({accountId:user}, options, next, previous)
        return response.send(result)
    }
} 


exports.search =  async (request, response) => {

    const { keyword, next, previous } = request.query

    const myCustomLabels = {  // 커스텀으로 생성가능하지만 여기서는 하지않음
        totalDocs: 'totalCount',
        docs: 'fileList',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        hasNextPage: 'hasNext',
        hasPrevPage : 'hasPrevious',
        totalPages: 'pageCount',
        meta: 'paginator',
    }

    const options = {
        page : parseInt(next, 10) || 1,
        limit: 10,
        customLabels: myCustomLabels,
        sort: {created: -1 },
    };                           

    if (keyword) {
        // var tags = await Sound.find({ tags: new RegExp(keyword)})
        // var sound = await Sound.find({ soundName: new RegExp(keyword)})
        // var category = await Sound.find({ category: new RegExp(keyword)})
        // var search = [tags, sound, category]
        var result = await Sound.paginate({$or: [{ tags: new RegExp(keyword)},{ soundName: new RegExp(keyword)},{ category: new RegExp(keyword)}  ] }, options, next, previous )
        response.send(result)
    }
} 

exports.mylike =  async (request, response) => { // 토탈카운드 isDeleted false 인것만 
    var { token } = request.headers 

    var decoded_token = jwt.verify(token, MY_SECRET_KEY);

    const { next, previous } = request.query

    const myCustomLabels = {  // 커스텀으로 생성가능하지만 여기서는 하지않음
        totalDocs: 'totalCount',
        docs: 'fileList',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        hasNextPage: 'hasNext',
        hasPrevPage : 'hasPrevious',
        totalPages: 'pageCount',
        meta: 'paginator',
    }

    var popul = ({ path: 'soundId'});
    
    const options = {
        page : parseInt(next, 10) || 1,
        limit: 10,
        customLabels: myCustomLabels,
        sort: {created: -1 },
        populate: popul,
        hasNextPage: hasNext,
    };                                       

    if (decoded_token) {
        var likeid = await Like.paginate({accountId:decoded_token.user, isDeleted: false}, options, next, previous)
        // var sound = await likeid.find({_id:likeid.soundId,isLiked:true}).populate({
        //     path: 'accountId',
        //     select:'accountEmail accountName accountImg'})
            response.send(likeid)
    }
}

exports.file_path = async (request, response, next) => {
    var { fileName } = request.params;
    var filePath = path.resolve(__dirname, "../soundsfiles/" + fileName );

    return response.sendFile(filePath)
}