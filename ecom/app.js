var express = require("express")
var app = express()
var bodyparse = require("body-parser")
var mongoose = require("mongoose")
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
var methodOverride = require("method-override")
app.use(methodOverride("_method"))


app.use(bodyparse.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
var categorie = require("./models/categorie")
var product = require("./models/product")
var categorieRoute = require("./routes/categorie")
var productRoute = require("./routes/product")
app.use(categorieRoute)
app.use(productRoute)

app.listen(3000, function() {
    console.log("started")
})