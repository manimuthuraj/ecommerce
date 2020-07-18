var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var controller = require("../controllers/admin")

//admin dashboard route 
router.get("/admin", controller.Dashboard)


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