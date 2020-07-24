var express = require("express")
var router = express.Router();
var bcrypt = require("bcrypt")
var categorie = require("../models/categorie")
var product = require("../models/product")
var euser = require("../models/euser")
var controller = require("../controllers/admin")
var email = require("../middleware/index")

//admin dashboard route 
router.get("/admin", controller.Dashboard)

//user list
router.get("/admin/user", controller.adminUserpanel)

//user password change
router.put("/admin/user", controller.userPasswordchange)

module.exports = router