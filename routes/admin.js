const express = require("express");
const router = express.Router();
const db = require("../data/db")

/* Fromdan aldığımız bilgilerle veri tabanında bir kayıt oluşturalım, Fromdan gelen dataları ilgili root a göndermemiz gerekir,   */

router.get( "/blog/create", async(req ,res) => {
// Bize get requesti aracılığıyla bu form geliyorsa biz sayfa categories leri göndericez tamam ama post requesti geldiği zaman formdaki bilgilerle insert sorgusu oluşturup bu bilgileri veri tabanına ekliyeceğiz 
    try {
        const [categories, ] = await db.query("select * from category") //kategori tablosunda ki tüm verileri getir

        res.render("admin/blog-create" , {
            title: "Yeni Blog Ekle",
            categories: categories,
        })
    } catch (error) {
        console.log(error);
    }
})


router.post("/blog/create" , async (req, res) => {
    // body içerisinde bize gelen tüm veriker mevcuttur body üzerinden verile ulaşabiliyoruz.
    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    const resim = req.body.resim;
    const kategori = req.body.kategori; //bu formun ismidir
    const anasayfa = req.body.anasayfa == "on" ? 1:0 ; 
    const onay = req.body.onay == "on" ? 1:0 ;

    //Bize on veya of gelecektir biz onlardan ziyade true veya false isiyoruz 1:0 yazabileceğimiz gibi onların yerien true ve false de yazabiliriz.
    //şimdi aldığımız bu dataları veri tabanına aktaralım
    //veri tabanına kayıt eklerken INSERT komutunu kullanıyoruz (küçük harfede yazabiliriz)

    try {
        await db.query("INSERT INTO blog(baslik,aciklama,resim,anasayfa,onay,categoryid) VALUES(?,?,?,?,?,?)", [baslik ,aciklama ,resim ,anasayfa ,onay, kategori  ] ) // Burada gelen dataların hangi colonlara yazdırılacak onun isimlerini yazıyoruz o yüzden isimler veri tabanında nasıl yazıyorsa aynı şekilde yazamız gerekiyor nede olsa ordaki isimlere göre colonlara kaydedicek
        res.redirect("/");

    } catch (error) {
        console.log(error);
    }

    console.log(req.body) //-> gelen req içindeki body bilgisi sayfadan gelen data bilgisini verir. örn/ baslik="node.js" , aciklama="abc" ama biz bu bilgilerin hangi formatda geldiğinide yönetiyor olmamız gerekir. bunun için ana sayfada app.use(express.urlencoded) dememiz gerekir
})


router.get( "/blog/:blogid", (req ,res) => {
    res.render("admin/blog-edit")
}  )

router.get( "/blogs", (req ,res) => {
    res.render("admin/blog-list")
}  )

module.exports = router

/*

router.use( "/blog/create", async(req ,res) => {

    if (req.method("POST")) { sayfadan gelen bilgiye göre gelen POST requestiyse ona göre bir kayıt işlemi yapacağız Eğer gelen veri GET ise de kullanıcıya formu göstereceğiz
        //KAYIT
    }
    else{
    try {

        const [categories, ] = await db.query("select * from category") //kategori tablosunda ki tüm verileri getir

        res.render("admin/blog-create" , {
            title: "Yeni Blog Ekle",
            categories: categories,
        })
    } catch (error) {
        console.log(error);
    }
}  )
    }

AMA BU ŞEKİLDE YAZMAYA GEREK YOK.
* eskide route.use yaptığımızda normal bir middleware oluşturmuş oluyorduk. Ama onun yerine artık biz 
GET işlemleri için route.get -> get işlemi geldiği zaman direk o middleware devreye giricek
POST işelemleri içidnde route.post -> sayfadan post isteği geldiği zamanda o fonksiyon çalışmış olur.


*/