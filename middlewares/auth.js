module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.redirect("/account/login?retunUrl=" + req.originalUrl);
    }
    next()
}


/*
    /admin/blogs

req.url dersem sadece blogs bilgisi gelir
req.originalUrl dersel /admin/blogs şeklinde hepsi gelir.
*/