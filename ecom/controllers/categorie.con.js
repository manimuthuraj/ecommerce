var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")

function sayHi() {
    console.log('Hello');
}


//Displaying Active Categorie and products
var Allcategorie = async function(req, res) {
    try {
        // var s = parseInt(req.query.sort)
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
                    'cat.status': { $ne: "block" },
                }
            }
        ]).sort({ created_date: -1 })
        let Parser = require('rss-parser');
        let parser = new Parser();
        var feed = await parser.parseURL(' http://feeds.bbci.co.uk/news/technology/rss.xml');
        res.render("ecom", { allcat: allcat, products: products, feed: feed })
        return categorie.find({})

    } catch (e) {
        console.log(e)
            //req.flash("error", e)
        res.redirect("/")
    }
}

//Adding categorie
var AddCategorie = async function(req, res) {
    try {
        var cat = await categorie.create(req.body.cat)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

//Editing categorie
var EditCategorie = async function(req, res) {
    try {
        var cat = await categorie.findById(req.params.id)
        res.render("editcat", { cat: cat })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

//Updating categories
var UpdateCategorie = async function(req, res) {
    try {
        updatedcat = await categorie.findByIdAndUpdate(req.params.id, req.body.cat)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

//Deleting Categories
var deleteCategorie = async function(req, res) {
    try {
        var dele = await categorie.findByIdAndRemove(req.params.id)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
}

var searchCategorie = function(req, res) {
    product.find({ name: new RegExp(req.query.name, 'i') }, function(err, response) {
        res.json(response);
    })
}

var sortCategorie = async function(req, response) {
    try {
        var pricef, pricet
        if (!req.query.price1 && !req.query.price2) {
            pricef = 0
            pricet = 100000
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
        var s = parseInt(req.query.sort)
        var d = parseInt(req.query.date)
            //console.log(name)
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
                    'cat.status': { $ne: "block" },
                    'price': { $gte: pricef, $lte: pricet },
                    'name': new RegExp(name, 'i')
                }
            }
        ]).sort({ price: s, created_date: d })
        response.json(products)
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }

}


module.exports = { Allcategorie, AddCategorie, EditCategorie, UpdateCategorie, deleteCategorie, searchCategorie, sortCategorie }