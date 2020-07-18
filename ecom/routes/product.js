var express = require("express")
var router = express.Router()
var product = require("../models/product")
var categorie = require("../models/categorie")
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var middleware = require("../middleware/index")
var controller = require("../controllers/product.con")

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

module.exports = router