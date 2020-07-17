var express = require("express")
var router = express.Router();
var passport = require("passport")
var euser = require("../models/euser")

router.get("/register", function(req, res) {
    res.render("auth/register")
})

router.post("/register", function(req, res) {
    console.log(req.body.password)
    var newUser = new euser({ username: req.body.username })
    euser.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return res.render("auth/register")
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/")
        })
    })
})

router.get("/login", function(req, res) {
    res.render("auth/register")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {

})

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})


module.exports = router