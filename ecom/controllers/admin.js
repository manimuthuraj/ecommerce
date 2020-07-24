var express = require("express")
var router = express.Router();
var bcrypt = require("bcrypt")
var categorie = require("../models/categorie")
var product = require("../models/product")
var euser = require("../models/euser")
var controller = require("../controllers/admin")
var email = require("../middleware/index")


var Dashboard = async function(req, res) {
    try {
        var allcat = await categorie.find({})
        var products = await product.find({})
        res.render("admin/admin", { allcat: allcat, products: products })
    } catch (e) {
        console.log(e)
        req.flash("Sorry!, You Dont'have permision")
        res.redirect("/")
    }
}

var adminUserpanel = async function(req, res) {
    try {
        var users = await euser.find()
        res.render("admin/adminuser", { users: users })
    } catch (e) {
        console.log(e)
    }
}
var userPasswordchange = async function(req, res) {
    try {
        var randompw = Math.floor(Math.random() * 5000) + 1000
        var randompws = randompw.toString()
        console.log(randompws)
        var hashedPassword = await bcrypt.hash(randompws, 10)
        var user = await euser.findByIdAndUpdate(req.body.id, { password: hashedPassword })
        var userEmail = await euser.findById(req.body.id)
        email.mailPw(userEmail.mail, randompws, userEmail.username)
        req.flash("error", "Mail sent to user")
        res.redirect("/admin/user")
    } catch (e) {
        console.log(e)
    }
}

module.exports = { Dashboard, adminUserpanel, userPasswordchange }