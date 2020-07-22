var express = require("express")
var router = express.Router()
var product = require("../models/product")
var categorie = require("../models/categorie")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")
var controller = require("../controllers/product.con")
const { response } = require("express")

// new product addition
router.get("/products", middleware.isAdmin, controller.CreateProduct)

//new product addition
router.post("/products", middleware.isAdmin, upload.single('picture'), controller.AddProduct)

//displaying product based on categorie
router.get("/products/:id", controller.ShowProduct)

//edit products
router.get("/products/:id/edit", middleware.isAdmin, controller.EditProduct)

//updating product details
router.put("/products/:id", middleware.isAdmin, controller.UpdateProduct)

//deleting products
router.delete("/products/:id", middleware.isAdmin, controller.DeleteProduct)

router.get("/range/products", function(req, res) {
    var query = { $and: [{ price: { $gt: req.query.price1, $lt: req.query.price2 } }, { categorie: req.query.id }] }
    product.find(query, function(err, response) {
        res.json(response)
    })
})

router.get("/sort/products", async function(req, res) {
    try {
        var s = parseInt(req.query.sort)
        var response = await product.find({ categorie: req.query.id }).sort({ price: s })
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

router.get("/sort/date/products", async function(req, res) {
    try {
        var s = parseInt(req.query.date)
        var response = await product.find({ categorie: req.query.id }).sort({ created_date: s })
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router