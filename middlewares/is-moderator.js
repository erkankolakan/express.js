module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.redirect("/account/login?retunUrl=" + req.originalUrl);
    }

    //admin değilse ve aynı zamanda moderator değilse bu durumda tekrar login sayfasına yönlendirilebilir.
    
    if (!req.session.roles.includes("admin") && !req.session.roles.includes("moderator")) {
        req.session.message = {text: "Yetkili bir kullanıcı ile oturum açınız."}
        return res.redirect("/account/login?retunUrl=" + req.originalUrl);

    }
    next()
}