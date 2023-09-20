// module.exports = (req ,res , next ) => {
//     res.locals.csrfToken = req.csrfToken();
//     next()
// }

// locals içerisinde csrfToken adında bir değişken oluştur. Bu değişkeni gelen requesteki csurfToken fonksiyonundan al.

// csurf ı birden fazla form da kullanacağımız için sayfalara tek tek göndermek yerine global alanda tutmak daha mantıklı. Buraya yazmakla global alana taşımış olmuyoruz app.js içerisinde middleware olarak eklememiz gerekir. Tabi böyle yaparsak tüm sayfalarda olmuş olur ama ben sadece form olan sayfalarda bulunsun istiyorum. O zaman routes içerisinde ihityacı olan sayfalara göndereceğim.

// csrfToken fonksiyonu req içerisinde mevcut zaten.
// Biz csrf i middleware olarak tanımladığımız için direk erişebiliriz.