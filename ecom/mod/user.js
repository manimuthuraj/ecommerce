var express = require("express")
var bcrypt = require("bcrypt")
var euser = require("../models/euser")
var carts = require("../models/cart")
var multer = require('multer')
var userorder = require("../models/myorder")
var upload = multer({ dest: 'uploads' })

var oldPasswords = function(id) {
    return euser.findById(id)
}

var cart = function(id) {
    return carts.find({ user: id })
}
module.exports = { cart }