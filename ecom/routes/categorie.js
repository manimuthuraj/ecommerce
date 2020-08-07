var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var controller = require("../controllers/categorie.con")
var middleware = require("../middleware/index");
const { response } = require("express");

/**
 * @api {get} / list all categorie and product
 * @apiName Allcategorie
 * @apiGroup Categorie
 */

//displaying categories 
router.get("/", controller.Allcategorie)


//adding new categorie
router.get("/add", middleware.isAdmin, function(req, res) {
    res.render("add") //rendering categorie addition form
})

/**
 * @api {post} /add add categorie 
 * @apiName Allcategorie
 * @apiGroup Categorie
 */

//adding new categorie
router.post("/add", middleware.isAdmin, controller.AddCategorie)

//editing categorie
router.get("/categorie/:id", middleware.isAdmin, controller.EditCategorie)

/**
 * @api {put} /categorie/:id update categorie 
 * @apiName Allcategorie
 * @apiGroup Categorie
 */

//update categorie
router.put("/categorie/:id", middleware.isAdmin, controller.UpdateCategorie)

/**
 * @api {delete} /categorie/:id delete categorie 
 * @apiName Allcategorie
 * @apiGroup Categorie
 */


//deleting categorie
router.delete("/categorie/:id", middleware.isAdmin, controller.deleteCategorie)

/**
 * @api {get} /search products 
 * @apiName Allcategorie
 * @apiGroup Categorie
 */

//search
router.get("/search", controller.searchCategorie)

// sort price high to low,low to high
router.get("/sort", controller.sortCategorie)

router.get("/message", function(req, res) {
    res.set({
        "connection": "keep-alive",
        "content-type": "text/event-stream"
    })
    setInterval(function() { sseFunction() }, 10000)

    function sseFunction() {
        var data = {
            message: 'Big Billion day sale',
            cat: "grap ur dream phone"
        }

        res.write('data:' + JSON.stringify(data) + '\n\n')
    }
    // var data = { message: 'hi' }
    // res.write(JSON.stringify(data))
})
module.exports = router