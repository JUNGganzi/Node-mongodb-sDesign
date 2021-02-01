const express = require('express');
const router = express.Router();
const userController = require("../controller/user_controller");

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

module.exports = router;