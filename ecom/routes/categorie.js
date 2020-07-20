var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var controller = require("../controllers/categorie.con")
var middleware = require("../middleware/index")

/**
 * @api{get}/ categorie information
 * @apiadd Adding categorie
 */
//displaying categories 
router.get("/", controller.Allcategorie)

//adding new categorie
router.get("/add", middleware.isAdmin, function(req, res) {
    res.render("add") //rendering categorie addition form
})

//adding new categorie
router.post("/add", middleware.isAdmin, controller.AddCategorie)

//editing categorie
router.get("/categorie/:id", middleware.isAdmin, controller.EditCategorie)

//update categorie
router.put("/categorie/:id", middleware.isAdmin, controller.UpdateCategorie)

//deletinng categorie
router.delete("/categorie/:id", middleware.isAdmin, controller.deleteCategorie)

//search
router.post("/search", function(req, res) {
    product.find({ name: new RegExp(req.body.name, 'i') }, function(err, response) {
        res.json(response);
    });
})

//range
router.post("/range", function(req, res) {
    var price1 = parseInt(req.body.price1)
    var price2 = parseInt(req.body.price2)
        // var last = new Date()
        // last.setDate(last.getDate() - 30);
        // console.log(last)
        //var dates = product.find({ created_date: { $gte: last } })
        //console.log(dates)
    product.find({ price: { $gt: price1, $lt: price2 } }, function(err, response) {
        res.json(response);
    });
})

module.exports = router