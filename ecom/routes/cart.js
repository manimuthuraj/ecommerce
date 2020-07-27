var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var carts = require("../models/cart")
var controller = require("../controllers/cart")
var userorder = require("../models/myorder")
var middleware = require("../middleware/index");
const myorder = require("../models/myorder");

//cart list
router.get("/cart", middleware.logedin, controller.cartList)

//add item to cart
router.post("/cart", middleware.logedin, controller.addCart)

//edit cart
router.put("/cart/edit", controller.editCart)

//delete cart item
router.delete("/cart/:id", controller.deleteCart)

//buy and create user order
router.post("/buy", controller.buyOrder)

module.exports = router