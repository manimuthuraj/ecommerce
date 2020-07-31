var nodemailer = require("nodemailer")

//Cheking Admin or not
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

//checing logedin or not and if yes restricting from registrattion and login page
async function islogedin(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

//Checking logedin or not and if not saying pleasing login 
async function logedin(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.flash("error", "please login")
        res.redirect("/")
    }
}

//Sending welcome mail when user singup
async function mail(gm, user) {
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
        subject: 'Welcome to ecom website',
        html: '<h1>Welcome,</h1>' + user + ' <h5>Enoy the best shoping </h5>'
    };

    try {
        var info = await transporter.sendMail(mailOptions)
        console.log(info.response)
    } catch {
        console.log(e)
    }
}


//changing user password and sending password to user
async function mailPw(gm, pw, user) {
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
        subject: 'Ecommerce.com Change password regarding',
        html: '<h1>Hi,' + user + '<h1> <h5>Hope you doing well </h5> <p>For security reason we have changed your password we advsie you to change the password</p><h3>user this password to change your password</h3> <h5>' + pw + '</h5>'
    };

    try {
        var info = await transporter.sendMail(mailOptions)
        console.log(info.response)
    } catch {
        console.log(e)
    }
}

//exporting methods
module.exports = {
    isAdmin,
    islogedin,
    mail,
    mailPw,
    logedin
}