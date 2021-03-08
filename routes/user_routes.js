const express = require('express');
const router = express.Router();
const userController = require("../controller/user_controller");
const multer = require('multer')
const path = require('path');
// const upload = multer({ // 저장위치설정
//     dest: 'profiles/'
// });

var storage = multer.diskStorage({ 
    destination: function(request, file, cb) { // 저장위치설정 
        cb(null,'profiles')
    },
    filename: function(requset, file, cb) { // 파일 저장할때 제목설정 
        var extension = path.extname(file.originalname); // 이미지파일확장자명
        cb(null,file.fieldname + '-' + Date.now() + extension) // 저장되는 시점의 시각으로 이미지 저장
    }
})

var upload = multer({storage:storage})

// 회원가입
router.post("/create/account", userController.create);
// 이메일인증
router.get("/confirm/account", userController.confirm);
// 로그인
router.post("/login", userController.login);
// 토큰 디코드
router.get("/token/test", userController.tokentest)
// 토큰 으로 프로필정보불러오기
router.get("/get/profile/info", userController.tokenprofile)
// 토큰값으로 user 프로필 이미지 및 accountname update
router.post("/update/profile", upload.single('userImg'),userController.updateProfile)// userImg =  키값

router.get("/get/img/:filename", userController.img_path)
// userController.tokentest,
module.exports = router;


// Key	Description
// dest or storage :파일이 저장될 위치
// fileFilter: 어떤 파일을 허용할지 제어하는 함수
// limits: 업로드 된 데이터의 한도
// preservePath: 파일의 base name 대신 보존할 파일의 전체 경로