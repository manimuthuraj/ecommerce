var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var carts = require("../models/cart")
var middleware = require("../middleware/index");
var mod = require("../mod/user")

const { update } = require("../models/categorie");

//Listing products in the cart
var cartList = async function(req, res) {
    try {
        //var cart = await carts.find({ user: req.user._id })
        var cart = await mod.cart(req.user._id) //mod file
        var subs = await carts.aggregate([{
            $match: { "user": req.user._id }
        }, {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        }, { $group: { _id: "$user", subtotals: { $sum: "$total" } } }])

        res.render("cart/cart", { cart: cart, subtotal: subs[0].subtotals })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

//adding items to cart
var addCart = async function(req, res) {
    try {
        var cart = await product.findById(req.body.product)
        var createCart = { name: cart.name, quantity: 1, price: cart.price, total: cart.price, image: cart.image, product: cart._id, user: req.user._id, status: "c" }
        var addcart = await carts.create(createCart)
        req.flash("error", "added to cart")
        res.redirect("/")
    } catch (e) {
        console.log(e)
        req.flash("error", "something went wrong")
        res.redirect("/")
    }
}

//edting items in the cart
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

//Delete items in the cart
var deleteCart = function(req, res) {
    carts.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            req.flash("error", "something went wrong" + err + "")
            res.redirect("/")
        } else {
            res.redirect("/cart")
        }
    })
}

//Adding items to the cart and MyOrders when user buy
var buyOrder = async function(req, res) {
    try {
        var cart = await product.findById(req.body.product)
        var createCart = { name: cart.name, quantity: 1, price: cart.price, total: cart.price, image: cart.image, product: cart._id, user: req.user._id, status: "b" }
        var addcart = await carts.create(createCart)
        res.redirect("/cart")
    } catch (e) {
        console.log(e)
        req.flash("error", "something went wrong")
        res.redirect("/cart")
    }
}
module.exports = { cartList, addCart, editCart, deleteCart, buyOrder }