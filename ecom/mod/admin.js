var express = require("express")
var router = express.Router();
var bcrypt = require("bcrypt")
var categorie = require("../models/categorie")
var product = require("../models/product")
var euser = require("../models/euser")
var carts = require("../models/cart")
var controller = require("../controllers/admin")
var email = require("../middleware/index")


var orders = carts.aggregate([{
    $match: { 'status': { $ne: 'c' } }
}, {
    $group: {
        _id: null,
        total: { $push: '$total' },
        totalproducts: { $sum: 1 },
        subtoatal: { $sum: "$total" }
    }
}])




module.exports = { orders }