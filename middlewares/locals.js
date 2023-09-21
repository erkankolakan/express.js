module.exports = (req , res , next) => {
    res.locals.isAuth = req.session.isAuth //-> biz local içine isAuth isminde bir değişken atıyoruz. Bu değişken gelen req in içindeki sessiondaki isAuth keyine sahip değeri alır. Artık local içine atmış olduğum tüm değerler locals içerisinde erişilenilir.
    res.locals.fullname = req.session.fullname

    res.locals.isAdmin = req.session.roles ? req.session.roles.includes("admin") : false 
    res.locals.isModerator = req.session.roles ? req.session.roles.includes("moderator") : false 

    /*
        req.session.role bilgisi eğer tanımlanmışssa ki uygulamanın login kısmında tanımlanacak bu. Bişz include aracılığıyla ben admin e bakabilirim.Eğer admin varsa true yoksa false değerini döndürür. 
    */

    next()
}

