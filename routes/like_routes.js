const express = require('express');
const router = express.Router();
const soundController = require("../controller/sound_controller");
const userController = require("../controller/user_controller");
const likeController = require("../controller/like_controller");


router.post("/set/like",likeController.like)

module.exports = router;