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

/**
 * @api {get} /products/:id list products based on categorie id
 * @apiName products
 * @apiGroup products
 * @apiParam {id} categorie
 * @apiParam {object} req
 * @apiParam {object} res
 */

//displaying product based on categorie
router.get("/products/:id", controller.ShowProduct)

//edit products
router.get("/products/:id/edit", middleware.isAdmin, controller.EditProduct)

/**
 * @api {put} /products/:id update products based on id
 * @apiName products
 * @apiGroup products
 * @apiParam {id} product
 * @apiParam {object} req
 * @apiParam {object} res
 */

//updating product details
router.put("/products/:id", middleware.isAdmin, controller.UpdateProduct)

/**
 * @api {delete} /products/:id list products based on categorie id
 * @apiName products
 * @apiGroup products
 * @apiParam {id} categorie
 * @apiParam {object} req
 * @apiParam {object} res
 */

//deleting products
router.delete("/products/:id", middleware.isAdmin, controller.DeleteProduct)

//sort and filter products
router.get("/sort/products", controller.sortProduct)

module.exports = router