var express = require("express")
var app = express()
var bcrypt = require("bcrypt")
require("dotenv").config()
var bodyparse = require("body-parser")
var mongoose = require("mongoose")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var nodemailer = require("nodemailer")
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
var methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.use(express.static(__dirname + '/uploads'))
var flash = require('connect-flash')

var multer = require('multer')
var upload = multer({ dest: 'uploads' })

app.use(flash())
app.use(bodyparse.urlencoded({ extended: true }))
require("./config/dbconnection")
var categorie = require("./models/categorie")
var product = require("./models/product")
var euser = require("./models/euser")
var cart = require("./models/cart")
var categorieRoute = require("./routes/categorie")
var productRoute = require("./routes/product")
var adminRoute = require("./routes/admin")
var authRoute = require("./routes/auth")
var userRoute = require("./routes/user")
var cartRoute = require("./routes/cart")

require("./config/passportconfic")(app)

app.use(categorieRoute)
app.use(productRoute)
app.use(adminRoute)
app.use(authRoute)
app.use(userRoute)
app.use(cartRoute)

const PORT = 3000 || process.env.PORT
app.listen(PORT, function() {
    console.log("started")
})