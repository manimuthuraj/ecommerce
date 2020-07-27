var express = require("express")
var bcrypt = require("bcrypt")
var router = express.Router()
var euser = require("../models/euser")
var multer = require('multer')
var userorder = require("../models/myorder")
var upload = multer({ dest: 'uploads' })
mod = require("../mod/user")

//User Profile
var user = async function(req, res) {
    try {
        var order = await userorder.find({ user: req.user._id })
        res.render("userProfile/profile", { order: order })
    } catch (e) {
        console.log(e)
    }
}

//user changing their password
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

//delete items in the MyOrder list
var deleteOrder = function(req, res) {
    userorder.findByIdAndRemove(req.params.id, function(err) { //finding userorder based on id and removing from db
        if (err) {
            console.log(err)
            req.flash("error", "something went wrong")
            res.redirect("/")
        } else {
            req.flash("error", "your order deleted sucessfully")
            res.redirect("/user")
        }
    })

}

module.exports = { user, userEdit, deleteOrder }