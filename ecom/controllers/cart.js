var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var carts = require("../models/cart")
var middleware = require("../middleware/index");

var cartList = async function(req, res) {
    try {
        var cart = await carts.find({ user: req.user._id })
        var subtotal = await carts.find({ user: req.user._id })
        var subtotals = 0
        subtotal.forEach(function(x) {
            subtotals = subtotals + x.total
        })
        res.render("cart/cart", { cart: cart, subtotal: subtotals })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

var addCart = async function(req, res) {
    try {
        var cart = await product.findById(req.body.product)
        var createCart = { name: cart.name, quantity: 1, price: cart.price, total: cart.price, image: cart.image, product: cart._id, user: req.user._id }
        var addcart = await carts.create(createCart)
        req.flash("error", "added to cart")
        res.redirect("/")
    } catch (e) {
        console.log(e)
        req.flash("error", "something went wrong")
        res.redirect("/")
    }
}

var editCart = async function(req, res) {
    try {
        var cartItem = await carts.findById(req.body.id)
        quantity = cartItem.quantity + 1
        var total = quantity * cartItem.price
        var cartUpdate = await carts.findByIdAndUpdate(req.body.id, { quantity: quantity, total: total })
        res.redirect("/cart")
    } catch (e) {
        console.log(e)
    }
}

var deleteCart = function(req, res) {
    carts.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/")
        } else {
            res.redirect("/")
        }
    })
}
module.exports = { cartList, addCart, editCart, deleteCart }