var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")

//displaying categories
router.get("/", async function(req, res) {
    try {
        var allcat = await categorie.find({
            status: { $ne: 'block' } //fetching only active categorie
        })
        res.render("ecom", { allcat: allcat })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//adding new categorie
router.get("/add", function(req, res) {
    res.render("add") //rendering categorie addition form
})

//adding new categorie
router.post("/add", async function(req, res) {
    name = req.body.name
    status = req.body.status
    try {
        var cat = await categorie.create({ name: name, status: status })
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

module.exports = router