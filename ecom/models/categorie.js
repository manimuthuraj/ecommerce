var mongoose = require("mongoose")
mongoose.connect("mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority", { useNewUrlParser: true })
var CategorieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'disabled'], required: true },
    created_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("categorie", CategorieSchema) //exporting categorie model