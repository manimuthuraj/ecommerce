var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")


//admin
router.get("/admin", isAdmin, async function(req, res) {
    try {
        var allcat = await categorie.find({})
        var products = await product.find({})
        res.render("admin/admin", { allcat: allcat, products: products })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})


async function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        id = await (req.user.role)
        if (id == 'admin') {
            next()
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
}


module.exports = router