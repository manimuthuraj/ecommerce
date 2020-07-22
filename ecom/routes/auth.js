var express = require("express")
var router = express.Router();
var passport = require("passport")
var euser = require("../models/euser")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")
var controller = require("../controllers/auth")


//registration route
router.get("/register", middleware.islogedin, controller.register)

//adding user to database
router.post("/register", middleware.islogedin, upload.single('picture'), controller.addUser)

//login
router.get("/login", middleware.islogedin, controller.loginForm)

//login authentication
router.post("/login", middleware.islogedin, controller.loginUse)
passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

//logout
router.get("/logout", controller.logotuse)

module.exports = router