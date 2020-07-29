var express = require("express")
var router = express.Router();
var bcrypt = require("bcrypt")
var categorie = require("../models/categorie")
var product = require("../models/product")
var euser = require("../models/euser")
var carts = require("../models/cart")
var controller = require("../controllers/admin")
var email = require("../middleware/index")


//Finding all categories and products for admin
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

//Listing Active and blocked user
var adminUserpanel = async function(req, res) {
    try {
        var users = await euser.find({ role: { $ne: 'admin' } })
        var orders = await carts.find({ status: { $ne: 'c' } })
        var totaluser = 0
        users.forEach(function(x) {
            totaluser = totaluser + 1
        })
        var totalproducts = 0
        var subtotal = 0
        orders.forEach(function(x) {
                totalproducts = totalproducts + 1
                subtotal = subtotal + x.total
            })
            //
        var user = await carts.aggregate([{
                $group: {
                    _id: "$user",
                    carts: { $push: "$total" },
                    totalproduct: { $sum: 1 },
                    sub: { $sum: "$total" }
                }
            }])
            //
        var products = await carts.aggregate([{
            $lookup: {
                from: "eusers",
                localField: "user",
                foreignField: "_id",
                as: "cat"
            }

        }, {
            $match: {
                'status': { $ne: "c" }
            }
        }, {
            $group: {
                _id: "$cat.username",
                status: { $push: "$cat.status" },
                carts: { $push: "$total" },
                totalproduct: { $sum: 1 },
                sub: { $sum: "$total" }
            }
        }])
        console.log(products)
            //console.log(user)
        res.render("admin/adminuser", { users: users, totaluser: totaluser, totalproducts: totalproducts, subtotal: subtotal })
    } catch (e) {
        console.log(e)
    }
}

//Changing user password
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

//Block or unblock users
var changeStatus = async function(req, res) {
    try {
        var user = await euser.findById(req.body.id)
        var status
        if (user.status == "active") {
            status = "block"
        } else {
            status = "active"
        }
        var changeStatus = await euser.findByIdAndUpdate(req.body.id, { status: status })
        req.flash("error", "status changed")
        res.redirect("/admin/user")
    } catch (e) {
        console.log(e)
        req.flash("error", "some thing went wrong")
        res.redirect("/")
    }
}
module.exports = { Dashboard, adminUserpanel, userPasswordchange, changeStatus }