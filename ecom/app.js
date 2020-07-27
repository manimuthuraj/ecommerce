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

app.use(require("express-session")({
    secret: "mmr",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(euser.authenticate()))
    //passport.serializeUser(euser.serializeUser())

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            var user = await euser.findOne({ username: username })
            if (!user) {
                return done(null, false, { message: "invalid username" });
            }
            if (user.status == "block") {
                return done(null, false, { message: "You were blocked" });
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "invalid password" });
            }
        } catch (e) {
            console.log(e)
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    euser.findById(id, function(err, user) {
        done(err, user);
    });
});


//passport.deserializeUser(euser.deserializeUser())
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.message = req.flash("error")
    next();
})

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