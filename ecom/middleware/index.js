async function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        id = await (req.user.role)
        if (id == 'admin') {
            next()
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
}

async function islogedin(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

module.exports = { isAdmin, islogedin }