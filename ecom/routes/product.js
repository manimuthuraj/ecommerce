var express = require("express")
var router = express.Router()
var product = require("../models/product")
var categorie = require("../models/categorie")

// new product addition
router.get("/products", async function(req, res) {
    try {
        var cate = await categorie.find({}) //finding all categorie to display in the dropdown list
        res.render("product", { cate: cate }) //rendering product adding page
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//new product addition
router.post("/products", function(req, res) {
    product.create(req.body.product, function(err, pro) { //creating new product
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
})

//displaying product based on categorie
router.get("/products/:id", async function(req, res) {
    var id = req.params.id
    var products = await product.find({ categorie: id })
    res.render("display", { products: products })
})

module.exports = router