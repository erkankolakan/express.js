// Routing işlemleri -> routing işlemleri de aslında midleware işlemlerine benzer şekilde çalışır.

const express = require("express");
const app = express(); 




    app.use( "/blogs/:blogid/user/:username", (req ,res, next) => {
//aslında biz burda /blogs/5 demek yerine /blogs/:blogid gibi bir değişken vermemiz gerekir. Bu sayede 67 nolu id ye sayif sayfay, veri tabanından sorgulayacağız ona göre bilgi yönlendirmesi yapacağız bu sayede sayfa başlığı sayfa görseli id numarasına göre yönlendireceğiz.
// buradaki :blogid bilgisini req.params sayesinde erişeceğiz.
// console.log(req.params); yazarsak { blogid : "56" } şeklinde gelir ama biz req.params.blogid yazarsak direk id numarasını verir.
// blogs/:blogid/user/username -> burada blog user sabit değerlerdir aslında birşey yazmadan önce neyin geleceğini yazıyoruz gibi düşünülebilir.
// bu sayede biz /blogs/5/user/ahmet yazarsak req.params.blogid = 5 ve req.params.username = ahmet olur.

        console.log(req.params.blogid);
        console.log(req.params.username);
        res.send("burası blog detay sayfası")

    }  )

    app.use( "/blogs", (req ,res, next) => {
        res.send("burası blogs")

    }  )

    app.use( "/", (req ,res, next) => {
        res.send("burası anasayfa")
 
    }  )

    /* bu hiyerarşide / sayfası en üstde olsa biz url yi değiştirksekde sürekli olarak / sayfası gözükür çünkü routes sayfası ne başa balar / varsa direk onu alır, o yüzden bizim en özel url ye sahip fonksiyonu en üste koymamız gerekir.
    eğer biz blogs/6 diye bir çağırma yaparsak /blogs/5 karşılamayacağı için /blogs sayfasına düşer.
    
    
    */







    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })

    /*
        routing işleminde eskiden
        if (req.url == "/" && req.method="GET") {
            res.end("index sayfası")
        }
        şeklinde uzun uzun yazıyorduk ama bunlara gerek yok. Routing işlemi use içerisinde kolaylaştırılmış. use nin ilk parametresine bir url verebiliyoruz  bu sayede verdiğin urldeki sayfa çalışır.
    
    */


