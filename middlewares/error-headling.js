module.exports = (err, req, res, next) =>{
    res.status(500).render("error/500" , {title:"hata sayfası"})
/*Bize başarılı bir sonuç geliyorsa 200 kodu http status kodu olarak gider. Bu zaten default olarak gider. Ama biz bir hata gönderiyorsak hata kodunu da göndermemiz gerekir. Serverdan kaynaklanan bir hata olduğunu belirtmek için bir durum kodu gönderiyoruz  */
}