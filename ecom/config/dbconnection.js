const mongoose = require('mongoose');
let mongourl = process.env.MONGODB_URI

//Connecting to database
mongoose.connect(mongourl, { useNewUrlParser: true })