var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var controller = require("../controllers/categorie.con")
var middleware = require("../middleware/index");
const { response } = require("express");

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
router.get("/search", controller.searchCategorie)

//range
router.get("/range", controller.rangeCategorie)

// sort price high to low,low to high
router.get("/sort", controller.sortCategorie)

module.exports = router