var express = require("express")
var router = express.Router();
var passport = require("passport")
var euser = require("../models/euser")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")


//registration route
router.get("/register", middleware.islogedin, function(req, res) {
    res.render("auth/register")
})

//adding user to database
router.post("/register", middleware.islogedin, upload.single('picture'), async function(req, res) {
    try {
        var use = { username: req.body.username, password: req.body.password, image: req.file.filename }
        console.log(use)
        var eu = await euser.create(use)
        res.redirect("/login")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//login
router.get("/login", middleware.islogedin, function(req, res) {
    res.render("auth/register")
})

router.post("/login", middleware.islogedin, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {

})

//logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})


module.exports = router