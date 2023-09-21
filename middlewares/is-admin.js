module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.redirect("/account/login?retunUrl=" + req.originalUrl);
    }

    //eğer kullanıcıı admin değilse bir hata mesaj göndereceğiz ve kullanıcıların url den kafalarına göre değerler yazarak farklı sayfalara gitmesi engellenebilir.
    
    if (!req.session.roles.includes("admin")) {
        req.session.message = {text: "Yetkili bir kullanıcı ile oturum açınız."}
        return res.redirect("/account/login?retunUrl=" + req.originalUrl);

    }
    next()
}