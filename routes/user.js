const express = require("express");
const router = express.Router();
const db = require("../data/db")

router.use( "/blogs/:blogid", (req ,res) => {
    res.render("users/blogDetails")
}  )

router.use( "/blogs", (req ,res) => {
    db.query("select * from blog where onay=1")
    .then(result => {

        db.query("select * from category")

            .then(sonuc => { 
            console.log()

            res.render("users/blogs" , {
                title:"Tüm Kurslar",
                blogs:result[0], 
                categories: sonuc[0] //bu bölümde kategory bilgisinide veri tabanına yazıp ordan çekmiş olduk.
            })

            })
            .catch(err => console.log(err))
    }) 
    .catch(err => {console.log(err)}) 
})

//burada extra bir sorgu çalıştırmış oluyoruz burası oldukça dikkat edilmesi gereken bir konu. Sorgudan gelen cevap then bloğu içerisinde ele alınıyor dolayısıyla then bloğu içerisinde extra bir sorgu çalıştırıyorum gelen bir sonuca göre diğer sonuçların çalıştırılmasını söylüyorum nede olsa asenkron bir işlemde sonucun ne zaman biteceği ne zaman geleceği belli değil dolayısıyla gelen sonucu beklememiz gerek bekle aşaması then bloğu içerisinde buradan bir cevap gelecek ve ben bu cevaba göre extra sorgu göndericem. 
// biz burada 2 tane bilgi aldık biz extra bir bilgi daha almak istediğimiz zaman en sonuncu then bloğunun içerisine tekrar then catch aracılığıyla bir sorgu yazacağız ve ona göre de res. .then içerisine almamız gerekir böyle ard arda callbacklere callbackhell diye adlandırılır.

router.use( "/", (req ,res) => {
    db.query("select * from blog where onay=1 and anasayfa=1") 
        .then(result => {

            db.query("select * from category")

                .then(sonuc => {
                console.log()

                res.render("users/index" , {
                    title:"Popüler Kurslar",
                    blogs:result[0], 
                    categories: sonuc[0]
                })

                })
                .catch(err => console.log(err))
        }) 
        .catch(err => {console.log(err)}) 
}  )
module.exports= router
