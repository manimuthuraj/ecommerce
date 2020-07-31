var express = require("express")
var router = express.Router();
var bcrypt = require("bcrypt")
var categorie = require("../models/categorie")
var product = require("../models/product")
var euser = require("../models/euser")
var carts = require("../models/cart")
var controller = require("../controllers/admin")
var email = require("../middleware/index")
var mod = require("../mod/admin")


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
        var totaluser = await euser.count({ role: { $ne: 'admin' } })
        var ords = await mod.orders //from mod subtotal and total no of products
        var userInformation = await carts.aggregate([{
                $lookup: {
                    from: "eusers",
                    localField: "user",
                    foreignField: "_id",
                    as: "use"
                }

            }, {
                $match: {
                    'status': { $ne: "c" }
                }
            }, {
                $unwind: {
                    path: "$use",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        username: "$use.username",
                        status: "$use.status",
                        totalproduct: { $sum: 1 },
                        sub: { $sum: "$total" },
                        created_date: "$created_date"
                    },
                }
            }
        ]);
        res.render("admin/adminuser", { users: users, totaluser: totaluser, totalproducts: ords[0].totalproducts, subtotal: ords[0].subtoatal, userInformation: userInformation })
    } catch (e) {
        console.log(e)
    }
}

//json data for graph represtation
var json = async function(req, res) {
    try {
        var userInformation = await carts.aggregate([{
                $lookup: {
                    from: "eusers",
                    localField: "user",
                    foreignField: "_id",
                    as: "use"
                }

            }, {
                $match: {
                    'status': { $ne: "c" }
                }
            }, {
                $unwind: {
                    path: "$use",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        username: "$use.username",
                        status: "$use.status",
                        totalproduct: { $sum: 1 },
                        sub: { $sum: "$total" },
                        created_date: "$created_date"
                    },
                }
            }
        ]);

        res.json(userInformation)
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
module.exports = { Dashboard, adminUserpanel, userPasswordchange, changeStatus, json }