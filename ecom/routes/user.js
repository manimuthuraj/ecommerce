var express = require("express")
var router = express.Router()
var euser = require("../models/euser")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")
var controller = require("../controllers/user")
var userorder = require("../models/myorder")

//user profile
router.get("/user", middleware.logedin, controller.user)

//user password edit
router.put("/user", controller.userEdit)

//Deleting products in MyOrders
router.delete("/order/:id", controller.deleteOrder)
module.exports = router