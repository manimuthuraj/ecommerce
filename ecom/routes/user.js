var express = require("express")
var router = express.Router()
var euser = require("../models/euser")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")
var controller = require("../controllers/user")

router.get("/user", controller.user)

router.put("/user", controller.userEdit)

module.exports = router