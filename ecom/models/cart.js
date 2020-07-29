var mongoose = require("mongoose")
var cartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_date: {
        type: Date,
        default: Date.now
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    //total: { $multiply: ["$price", "$quantity"] },
    total: { type: Number },
    image: { type: String },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "euser"
    },
    status: { type: String }
})

module.exports = mongoose.model("cart", cartSchema)