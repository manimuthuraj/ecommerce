var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")

var Allcategorie = async function(req, res) {
    try {
        var allcat = await categorie.find({
            status: { $ne: 'block' } //fetching only active categorie
        })
        var products = await product.aggregate([{
                    $lookup: {
                        from: "categories",
                        localField: "categorie",
                        foreignField: "_id",
                        as: "cat"
                    }
                },
                {
                    $match: {
                        'cat.status': { $ne: "block" }
                    }
                }
            ])
            //console.log(req.query.search)
            //console.log(req.path)
        res.render("ecom", { allcat: allcat, products: products })
        return categorie.find({})

    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

var AddCategorie = async function(req, res) {
    try {
        var cat = await categorie.create(req.body.cat)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

var EditCategorie = async function(req, res) {
    try {
        var cat = await categorie.findById(req.params.id)
        res.render("editcat", { cat: cat })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

var UpdateCategorie = async function(req, res) {
    try {
        updatedcat = await categorie.findByIdAndUpdate(req.params.id, req.body.cat)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

var deleteCategorie = async function(req, res) {
    try {
        var dele = await categorie.findByIdAndRemove(req.params.id)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}
module.exports = { Allcategorie, AddCategorie, EditCategorie, UpdateCategorie, deleteCategorie }