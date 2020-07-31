var bcrypt = require("bcrypt")
var passport = require("passport")
var euser = require("../models/euser")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")

//Rendering registration form
var register = function(req, res) {
    res.render("auth/register")
}

//adding user to Database
var addUser = async function(req, res) {
    try {
        if (!req.file == '') {
            image = req.file.filename
        } else {
            image = "f4d55184c4055bb7f7d95d4c025f85f7"
        }
        var hashedPassword = await bcrypt.hash(req.body.password, 10)
            /*console.log(hashedPassword)
            if (await bcrypt.compare('1234', hashedPassword)) {
                console.log("s")
            }*/
            //
        var use = { username: req.body.username, password: hashedPassword, mail: req.body.mail, image: image }
        var eu = await euser.create(use)
        var userMail = req.body.mail
        var user = req.body.username
        middleware.mail(userMail, user)
        req.flash("error", "Now login and see your mail")
        res.redirect("/login")
    } catch (e) {
        console.log(e)
        req.flash("error", "username which you gave already exist use someother name")
        res.redirect("/register")
    }
}

//rendering login form
var loginForm = function(req, res) {
    res.render("auth/register")
}

//login authentication
var loginUse = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
})

//logging out users
var logotuse = function(req, res) {
    req.logout();
    req.flash("error", "Loged Out successfully")
    res.redirect("/")
}

module.exports = { register, addUser, loginForm, loginUse, logotuse }