var express = require("express")
var app = express()
var bodyparse = require("body-parser")
var mongoose = require("mongoose")
var passport = require("passport")
var LocalStrategy = require("passport-local")
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
var methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.use(express.static(__dirname + '/uploads'))

var multer = require('multer')
var upload = multer({ dest: 'uploads' })

app.use(bodyparse.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
var categorie = require("./models/categorie")
var product = require("./models/product")
var euser = require("./models/euser")
var categorieRoute = require("./routes/categorie")
var productRoute = require("./routes/product")
var adminRoute = require("./routes/admin")
var authRoute = require("./routes/auth")

app.use(require("express-session")({
    secret: "mmr",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(euser.authenticate()))
passport.serializeUser(euser.serializeUser())
passport.deserializeUser(euser.deserializeUser())
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})


app.use(categorieRoute)
app.use(productRoute)
app.use(adminRoute)
app.use(authRoute)

app.listen(3000, function() {
    console.log("started")
})