var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var euserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    mail: { type: String, required: true },
    image: { type: String }
})

euserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("euser", euserSchema)