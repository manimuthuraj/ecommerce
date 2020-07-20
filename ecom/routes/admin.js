var express = require("express")
var router = express.Router();
var categorie = require("../models/categorie")
var product = require("../models/product")
var controller = require("../controllers/admin")

//admin dashboard route 
router.get("/admin", controller.Dashboard)


module.exports = router