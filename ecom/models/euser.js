var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var euserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    status: { type: String, default: "active" },
    mail: { type: String, required: true },
    image: { type: String }
})

euserSchema.plugin(passportLocalMongoose);


/*var changeStatusModel = function() {
    var user = await euser.findById(req.body.id)
    var status
    if (user.status == "active") {
        status = "block"
    } else {
        status = "active"
    }
    var changeStatus = await euser.findByIdAndUpdate(req.body.id, { status: status })
    console.log(changeStatus)
}*/

module.exports = mongoose.model("euser", euserSchema)
    //module.exports = { changeStatusModel }