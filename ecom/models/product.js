var mongoose = require("mongoose")
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })

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
    price: { type: Number, required: true },
    image: { type: String }
})

module.exports = mongoose.model("product", productSchema)