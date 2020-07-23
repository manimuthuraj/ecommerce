var express = require("express")
var bcrypt = require("bcrypt")
var router = express.Router()
var euser = require("../models/euser")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })

var user = async function(req, res) {
    try {
        res.render("userProfile/profile")
    } catch (e) {
        console.log(e)
    }
}

var userEdit = async function(req, res) {
    try {
        var oldPassword = await euser.findById(req.user._id)
        if (await bcrypt.compare(req.body.user, oldPassword.password)) {
            var hashedPassword = await bcrypt.hash(req.body.newuser, 10)
            var newu = await euser.findByIdAndUpdate(req.user._id, { "password": hashedPassword })
            req.flash("error", "Password changed successfully")
            res.redirect("/")
        } else {
            req.flash("error", "current password is worng")
            res.redirect("/user")
        }
    } catch (e) {
        console.log(e)
        req.flash("error", "Something went worng")
        res.redirect("/user")
    }
}

module.exports = { user, userEdit }