const User = require('../models/user_model');
const Like = require('../models/like_model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');  // 이메일인증
const jwt = require('jsonwebtoken');
const fs = require('fs');
const sharp = require('sharp')
const path = require('path');
const { send } = require('process');
require('dotenv').config();




const MY_SECRET_KEY = process.env.SECRET_KEY

var transporter = nodemailer.createTransport({  // transporter 에서 보낼 메일아이디와 비번 설정
    service: 'gmail',
    auth: {
    user:'bodercoding@gmail.com',
    pass:'codingboder'
    }
})


// 회원가입 
exports.create = async (request, response, next) => {
    const { accountEmail, accountPw, accountName } = request.body;

    var user = new User();
    

    // if (checkUser)
    //     return response.send("3588")

    user.accountEmail = accountEmail;
    user.accountPw = accountPw;
    user.accountName = accountName;
    user.created = Date.now()  // 포포몬쓰 차원
    user.updated = Date.now()


    if(!accountEmail || !accountPw || !accountName)
        return response.send("9176") // message: "모든 항목입력주세요"
    
    User.findOne({accountEmail: accountEmail}, function(err, results, next){
        if (results) {
            return response.send("3588")
        } else {
            user.save(function(err){  // save 처리 전에 해싱이 이뤄져야함
                if (err) {
                    throw err
                } else {
                    response.send(Array(user))
                }
                // 회원가입과 동시에 가입 이메일로 메일 전송 user_models 에 Schema.pre 설정함 
                var mailOption = { // 메일 옵션  설정
                    from: 'bodercoding@gmail.com',
                    to: user.accountEmail,
                    subject: '이메일 인증해주세요',
                    html: '<p>아래의 링크를 클릭해서 인증해주세요!</p>' +
                    "<a href='https://jungganzi.xyz/api/confirm/account" + '?email=' + user.accountEmail +" '>인증하기</a>"
                };
                transporter.sendMail(mailOption, function(err, res){ // 메일 발송
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('이메일발송성공')
                    }
                    transporter.close();
                });
            });
        }
    })
    
};                                                                                                                                                                                                                                                                                              


// 로그인
exports.login = async (request,response) => { // async 문을 사용해서 콜백함수 바로실행
    const { accountEmail, accountPw} = request.body;
    var user = await User.findOne({accountEmail:accountEmail, isAcceptEmail: true});

    if(user) { // DB에 bcrypt 해시처리된 암호확인 async await 콜백함수 바로실행
        const comparePassword = await bcrypt.compare(accountPw,user.accountPw);
        if (comparePassword) { // 해시처리된 암호 비교구문
            var token = jwt.sign({user:user._id}, MY_SECRET_KEY,{
                subject: "sDesign jwtoken",
                expiresIn: '1440m'  // 시간제한
            })
            response.status(200).json({
                token,
                accountEmail: accountEmail,
                accountName: user.accountName,
                accountId: user._id
            })
        } else {
            response.send("9991") // .json({  // comparePassword 예외구문
                //  message:"비밀번호가 다릅니다"
        }
    } else {
        response.send("8883")//.json({
            //message:"이메일이 다르거나 이메일 인증이 되지않았습니다"
        //})
    }
}


// 이메일 인증
exports.confirm = function(request, response){ // @ 이 %40 으로 인코딩되는데 디코드 시켜야 swagger 에서도 가능
    const { email } = request.query            // 현재는 링크타고 움직여야함

    User.updateOne({accountEmail:email},{$set:{isAcceptEmail:true}}, function(err, user){
        if (err) {
            console.log(err);
        } else {
            response.send('<script type="text/javascript">alert("Successfully verified"); window.location="https://jamong-prj.xyz/main"; </script>');
        }
    })
}


exports.updateProfile =  async (request, response, next) => {
    const { accountName } = request.body
    const  userImg  = request.file
    
    var token = request.headers.token  
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);                                           



    if (decoded_token) {
        if (!accountName && !userImg) {
            return response.send("7777"); // 따로따로
        } if (!accountName) {
        var user = await User.findOne({_id:decoded_token.user})
        var filename = userImg.filename
        var filePath =  `https://jungganzi.xyz/api/get/img/thumbnail_${filename}`;
        var data = await {  accountImg : filePath } 
        var update = await User.updateOne(user, data) // formdata 라 json 형태로 못받고 몽고db쿼리문째로 response
        
        await sharp("./profiles/" + filename) // 파일 리사이즈 순서 파일의위치와 이름 파일이 일차적으로 저장되고 썸네일이 붙은 파일로 리사이즈 되서 재저장
            .resize(250, 250)                   // 리사이즈크기
            .jpeg({quality : 100})              
            .toFile("./profiles/thumbnail_" + filename)     // 새로 저장할위치와 이름
        
        const removepath = './profiles/' + filename

        fs.unlink(removepath, (err) => {  // 원본파일 삭제 
            if (err) {
                console.log(err)
                return
            }
        })
        return response.send(update)
            } if (!userImg) {
                var user = await User.findOne({_id:decoded_token.user})
                var data2 = await {  accountName } 
                var update2 = await User.updateOne(user, data2)
                return response.send(update2)
            }
        }
        var user = await User.findOne({_id:decoded_token.user})
        var filename = userImg.filename
        var filePath =  `https://jungganzi.xyz/api/get/img/thumbnail_${filename}`;
        var data3 = await {  accountName, accountImg : filePath } 
        var update3 = await User.updateOne(user, data3) // formdata 라 json 형태로 못받고 몽고db쿼리문째로 response
        
        await sharp("./profiles/" + filename) // 파일 리사이즈 순서 파일의위치와 이름 파일이 일차적으로 저장되고 썸네일이 붙은 파일로 리사이즈 되서 재저장
            .resize(250, 250)                   // 리사이즈크기
            .jpeg({quality : 100})              
            .toFile("./profiles/thumbnail_" + filename)     // 새로 저장할위치와 이름
        
        const removepath = './profiles/' + filename

        fs.unlink(removepath, (err) => {  // 원본파일 삭제 
            if (err) {
                console.log(err)
                return
            }
        })
        return response.send(update3)
    }

exports.tokentest = async (request, response) => {
    var token = request.headers.token  // header에서 토큰 받아오기
    var decoded_token = jwt.verify(token, MY_SECRET_KEY); // 생성한토큰 decoded

    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user}) // 바로 맞는id 데이터찾아오기
        return response.status(200).json({
            accountEmail: user.accountEmail,
            accountId: user._id,
            accountName: user.accountName
        })
    } else {
        response.status(500).json({
            message: "[에러]서버에 문제가 있어 회원 가입에 실패하였습니다."
        })
    }
}


exports.tokenprofile = async (request, response) => { // 거의동일함 tokentest랑
    var token = request.headers.token
    var decoded_token = jwt.verify(token, MY_SECRET_KEY);

    if (decoded_token) {
        var user = await User.findOne({_id:decoded_token.user})
        return response.status(200).json({
            _id: user._id,
            accountEmail: user.accountEmail,
            accountName: user.accountName,
            accountImg: user.accountImg
        })
    } else {
        response.status(500).json({
            message: "[에러]서버에 문제가 있어 회원 가입에 실패하였습니다."
        })
    }
}

exports.img_path = async (request, response, next) => {
    var { filename } = request.params;
    var filePath = path.resolve(__dirname, "../profiles/" + filename );

    return response.sendFile(filePath)
}