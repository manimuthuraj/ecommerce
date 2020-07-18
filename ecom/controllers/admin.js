var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")

var Dashboard = async function(req, res) {
    try {
        var allcat = await categorie.find({})
        var products = await product.find({})
        res.render("admin/admin", { allcat: allcat, products: products })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

module.exports = { Dashboard }