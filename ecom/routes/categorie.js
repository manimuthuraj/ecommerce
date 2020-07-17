var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")

//displaying categories 
router.get("/", async function(req, res) {
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
        res.render("ecom", { allcat: allcat, products: products })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

//adding new categorie
router.get("/add", function(req, res) {
    res.render("add") //rendering categorie addition form
})

//adding new categorie
router.post("/add", async function(req, res) {
    try {
        var cat = await categorie.create(req.body.cat)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

router.get("/categorie/:id", async function(req, res) {
    try {
        var cat = await categorie.findById(req.params.id)
        res.render("editcat", { cat: cat })
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

router.put("/categorie/:id", async function(req, res) {
    try {
        updatedcat = await categorie.findByIdAndUpdate(req.params.id, req.body.cat)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})

router.delete("/categorie/:id", isAdmin, async function(req, res) {
    try {
        var dele = await categorie.findByIdAndRemove(req.params.id)
        res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})


async function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        id = await (req.user.role)
        if (id == 'admin') {
            next()
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
}

module.exports = router