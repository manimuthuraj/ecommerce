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
var flash = require('connect-flash')

var multer = require('multer')
var upload = multer({ dest: 'uploads' })

app.use(flash())
app.use(bodyparse.urlencoded({ extended: true }))
require("./config/dbconnection")
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
    //passport.serializeUser(euser.serializeUser())


passport.use(new LocalStrategy(
    function(username, password, done) {
        euser.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "invalid username" });
            }
            if (password != user.password) {
                return done(null, false, { message: "invalid password" });
            }
            return done(null, user);
        });
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

const PORT = 3000 || process.env.PORT
app.listen(PORT, function() {
    console.log("started")
})