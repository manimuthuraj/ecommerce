var nodemailer = require("nodemailer")

async function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        id = await (req.user.role)
        if (id == 'admin') {
            next()
        } else {
            res.redirect("/")
        }
    } else {
        req.flash("error", "login first")
        res.redirect("/")
    }
}

async function islogedin(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

async function mail(gm) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.passWord
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: process.env.user,
        to: gm,
        subject: 'Welcome to ecommerce website',
        html: '<h1>Welcome<h1> <h5>Enoy the best shoping </h5>'
    };

    try {
        var info = await transporter.sendMail(mailOptions)
        console.log(info.response)
    } catch {
        console.log(e)
    }
}

module.exports = { isAdmin, islogedin, mail }