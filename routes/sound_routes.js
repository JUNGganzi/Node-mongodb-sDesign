const express = require('express');
const router = express.Router();
const soundController = require("../controller/sound_controller");
const userController = require("../controller/user_controller");
const multer = require('multer')
const path = require('path');
// const upload = multer({
//     dest: 'soundsfiles/'
// });

var storage = multer.diskStorage({ 
    destination: function(request, file, cb) { // 저장위치설정 
        cb(null,'soundsfiles')
    },
    filename: function(requset, file, cb) { // 파일 저장할때 제목설정 
        var extension = path.extname(file.originalname); // 파일 확장자명 받아오기
        cb(null,file.fieldname + '-' + Date.now() + extension) // 저장되는 시점의 시각으로 이미지 저장 UUID 만에하나 겹칤수도있음
    }
})


var upload = multer({storage:storage})

router.post("/upload/file", upload.single('userFile'),soundController.upload)

router.get("/get/soundList",soundController.getsoundlist)

router.get("/get/my/soundList",soundController.getmysoundlist)

router.post("/remove/my/sound", soundController.remove)

router.get("/search/sound", soundController.search)

router.get("/get/my/like/sounds", soundController.mylike)

router.get("/get/file/:fileName", soundController.file_path)

module.exports = router;