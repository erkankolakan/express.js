module.exports = (req , res , next) => {
    res.locals.isAuth = req.session.isAuth //-> biz local içine isAuth isminde bir değişken atıyoruz. Bu değişken gelen req in içindeki sessiondaki isAuth keyine sahip değeri alır. Artık local içine atmış olduğum tüm değerler locals içerisinde erişilenilir.
    res.locals.fullname = req.session.fullname
    next()
}