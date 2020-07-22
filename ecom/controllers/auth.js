var passport = require("passport")
var euser = require("../models/euser")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")

var register = function(req, res) {
    res.render("auth/register")
}
var addUser = async function(req, res) {
    try {
        var use = { username: req.body.username, password: req.body.password, mail: req.body.mail, image: req.file.filename }
        var eu = await euser.create(use)
        var userMail = req.body.mail
        middleware.mail(userMail)
        req.flash("error", "Now login and see your mail")
        res.redirect("/login")
    } catch (e) {
        console.log(e)
        req.flash("error", "username which you gave already exist use someother name")
        res.redirect("/register")
    }
}
var loginForm = function(req, res) {
    res.render("auth/register")
}

var loginUse = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
})

var logotuse = function(req, res) {
    req.logout();
    req.flash("error", "Loged Out successfully")
    res.redirect("/")
}

module.exports = { register, addUser, loginForm, loginUse, logotuse }