var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")

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
        res.render("ecom", { allcat: allcat, products: products })
        return categorie.find({})

    } catch (e) {
        console.log(e)
            //req.flash("error", e)
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

var searchCategorie = function(req, res) {
    product.find({ name: new RegExp(req.query.name, 'i') }, function(err, response) {
        res.json(response);
    })
}

var rangeCategorie = function(req, res) {
    var price1 = parseInt(req.query.price1)
    var price2 = parseInt(req.query.price2)
    var last = new Date()
        //last.setDate(last.getDate() - 4);
        //console.log(last)
        //product.find({ created_date: { '$lt': Date("2020-07-16T04:57:26.600Z") } }, function(err, res) {
        //  console.log(res)
        //})
    product.find({ price: { $gt: price1, $lt: price2 } }, function(err, response) {
        res.json(response);
    });
}

var sortCategorie = async function(req, response) {
    try {
        var s = parseInt(req.query.sort)
        var d = parseInt(req.query.date)
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
                    // 'cat.price': { $gt: 1000, $lt: 50000 }
                }
            }
        ]).sort({ price: s, created_date: s })
        response.json(products)
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }

}


module.exports = { Allcategorie, AddCategorie, EditCategorie, UpdateCategorie, deleteCategorie, searchCategorie, rangeCategorie, sortCategorie }