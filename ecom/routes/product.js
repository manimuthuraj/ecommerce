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
router.post("/products", async function(req, res) {
    try {
        var pro = await product.create(req.body.product)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//displaying product based on categorie
router.get("/products/:id", async function(req, res) {
    try {
        var id = req.params.id
        var products = await product.find({ categorie: id })
        var cate = await categorie.find({ _id: id })
        var user = "admin"
        if (user) {
            user = user
        } else {
            var user = ''
        }
        res.render("display", { products: products, cate: cate, user: user })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//edit products
router.get("/products/:id/edit", async function(req, res) {
    try {
        var cate = await categorie.find({})
        var updateproduct = await product.findById(req.params.id) //finding product based on id 
        res.render("editproduct", { product: updateproduct, cate: cate })

    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//updating product details
router.put("/products/:id", async function(req, res) {
    try {
        var updatedproduct = await product.findByIdAndUpdate(req.params.id, req.body.product) //updating product based on id
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//deleting products
router.delete("/products/:id", function(req, res) {
    product.findByIdAndRemove(req.params.id, function(err) { //finding prosuct based on id and removing from db
        if (err) {
            console.log(err)
            res.redirect("/")
        } else {
            res.redirect("/")
        }
    })

})

module.exports = router