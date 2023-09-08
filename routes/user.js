const express = require("express");
const router = express.Router();

const data =  {
    title:"Popüler Kurslar", 
    categories:["Web Geliştirme","Mobil Uygulamalar","Veri Analizi","Programlama","Ofis Uygulamaları"],
    blogs:[
        {
            blogid:1,
            baslik:"Web Geliştirme Kursu",
            aciklama:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            resim:"1.jpg",
            anasayfa:true
        },
        {
            blogid:2,
            baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
            aciklama:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            resim:"2.jpg",
            anasayfa:true
        },
        {
            blogid:3,
            baslik:"Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
            aciklama:"Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.",
            resim:"3.jpg",
            anasayfa:true // burası ana sayfada olmasın diyebilmek için bu şekilde diyoruz.     
        },
    ]
}


router.use( "/blogs/:blogid", (req ,res) => {
    res.render("users/blogDetails")
}  )


router.use( "/blogs", (req ,res) => {
    res.render("users/blogs", data) // blogs sayfasında da kullancağamız için burayada data objesini göndermemiz gerekir. 
}  )

router.use( "/", (req ,res) => {
    res.render("users/index" , data)
}  )

module.exports= router