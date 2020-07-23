const mongoose = require('mongoose');
let mongourl = process.env.MONGODB_URI
mongoose.connect(mongourl, { useNewUrlParser: true })