const express = require('express');
const router = express.Router();
const soundController = require("../controller/sound_controller");
const multer = require('multer')
const upload = multer({
    dest: 'soundsfiles/'
});

router.post("/upload/file")

router.get("/get/soundList")

router.get("/get/my/soundList")

router.post("/remove/my/sound")

router.get("/search/sound")

router.get("/get/my/like/sounds")


module.exports = router;