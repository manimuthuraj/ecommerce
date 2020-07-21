var express = require("express")
var router = express.Router()
var product = require("../models/product")
var categorie = require("../models/categorie")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")

var CreateProduct = async function(req, res) {
    try {
        var cate = await categorie.find({}) //finding all categorie to display in the dropdown list
        res.render("product", { cate: cate }) //rendering product adding page
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}
var AddProduct = async function(req, res) {
    try {
        var pro = { name: req.body.name, categorie: req.body.categorie, quantity: req.body.quantity, price: req.body.price, image: req.file.filename }
        console.log(pro)
        var pro = await product.create(pro)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}
var ShowProduct = async function(req, res) {
    try {
        var id = req.params.id
        var v = req.query
        var products = await product.find({ categorie: id })
        var cate = await categorie.find({ _id: id })
        res.render("display", { products: products, cate: cate })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}
var EditProduct = async function(req, res) {
    try {
        var cate = await categorie.find({})
        var updateproduct = await product.findById(req.params.id) //finding product based on id 
        res.render("editproduct", { product: updateproduct, cate: cate })

    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}
var UpdateProduct = async function(req, res) {
    try {
        var updatedproduct = await product.findByIdAndUpdate(req.params.id, req.body.product) //updating product based on id
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}
var DeleteProduct = function(req, res) {
    product.findByIdAndRemove(req.params.id, function(err) { //finding prosuct based on id and removing from db
        if (err) {
            console.log(err)
            res.redirect("/")
        } else {
            res.redirect("/")
        }
    })

}

module.exports = { CreateProduct, AddProduct, ShowProduct, EditProduct, UpdateProduct, DeleteProduct }