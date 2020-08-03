var express = require("express")
var app = express()
var euser = require("../models/euser")
var bcrypt = require("bcrypt")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var flash = require("connect-flash");

module.exports = function(app) {
    app.use(flash());
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
}