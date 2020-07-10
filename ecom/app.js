var express = require("express")
var app = express()
var bodyparse = require("body-parser")
var mongoose = require("mongoose")
app.set("view engine", "ejs");

app.use(bodyparse.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
var CategorieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'disabled'], required: true },
    created_date: {
        type: Date,
        default: Date.now
    }
})

var categorie = mongoose.model("categorie", CategorieSchema)

var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie"
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    udate: { type: Date },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
})

var product = mongoose.model("product", productSchema)

app.get("/", async function(req, res) {
    var allcat = await categorie.find({
        status: { $ne: 'block' }
    })
    var allpro = await product.find()

    res.render("ecom", { allcat: allcat })
})

app.get("/add", function(req, res) {
    res.render("add")
})

app.post("/add", async function(req, res) {
    name = req.body.name
    status = req.body.status
    var cat = await categorie.create({ name: name, status: status })
    res.redirect("/")
})

app.get("/products", async function(req, res) {
    var cate = await categorie.find({})
    res.render("product", { cate: cate })
})

app.post("/products", function(req, res) {
    product.create(req.body.product, function(err, pro) {
        if (err) {
            console.log(err)
        } else {
            console.log(pro)
            res.redirect("/")
        }
    })
})

app.get("/products/:id", async function(req, res) {
    id = req.params.id
    var products = await product.find({ categorie: id })
    res.render("display", { products: products })
})
app.listen(3000, function() {
    console.log("started")
})