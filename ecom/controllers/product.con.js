var express = require("express")
var router = express.Router()
var product = require("../models/product")
var categorie = require("../models/categorie")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")

//rendering create products form
var CreateProduct = async function(req, res) {
    try {
        var cate = await categorie.find({}) //finding all categorie to display in the dropdown list
        res.render("product", { cate: cate }) //rendering product adding page
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

//creating products
var AddProduct = async function(req, res) {
    try {
        var pro = { name: req.body.name, categorie: req.body.categorie, quantity: req.body.quantity, price: req.body.price, image: req.file.filename }
        var pro = await product.create(pro)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

//displaying products
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

//editing products
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

//updating products
var UpdateProduct = async function(req, res) {
    try {
        var updatedproduct = await product.findByIdAndUpdate(req.params.id, req.body.product) //updating product based on id
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

//Deleting products
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

//sorting and filtering products
var sortProduct = async function(req, res) {
    try {
        var s = parseInt(req.query.sort)
        var d = parseInt(req.query.date)
        var pricef, pricet
        if (!req.query.price1 && !req.query.price2) {
            pricef = 0
            pricet = 1000000
        } else {
            pricef = parseInt(req.query.price1)
            pricet = parseInt(req.query.price2)
        }
        var name
        if (!req.query.name) {
            name = {}
        } else {
            name = req.query.name
        }
        var query = { $and: [{ price: { $gt: pricef, $lt: pricet } }, { categorie: req.query.id }, { name: new RegExp(name, 'i') }] }
        var response = await product.find(query).sort({ price: s, created_date: d })
        res.json(response)
    } catch (e) {
        console.log(e)
    }
}

module.exports = { CreateProduct, AddProduct, ShowProduct, EditProduct, UpdateProduct, DeleteProduct, sortProduct }