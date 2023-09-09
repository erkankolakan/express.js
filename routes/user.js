const express = require("express");
const router = express.Router();
const db = require("../data/db")

const data =  {
    title:"Popüler Kurslar", 
    categories:["Web Geliştirme","Mobil Uygulamalar","Veri Analizi","Programlama","Ofis Uygulamaları"],
    blogs:[
        {
            blogid:1,
            baslik:"Web Geliştirme Kursu",
            aciklama:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            resim:"1.jpg",
            anasayfa:true,
            durum:true
        },
        {
            blogid:2,
            baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
            aciklama:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            resim:"2.jpg",
            anasayfa:true,
            durum:false
        },
        {
            blogid:3,
            baslik:"Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+",
            aciklama:"Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.",
            resim:"3.jpg",
            anasayfa:true,
            durum:true
        },
        {
            blogid:4,
            baslik:"Sıfırdan Uygulamalı React Geliştirme: Hooks, Redux & Firebase",
            aciklama:"En popüler frontend kütüphanesi React'i baştan sona uygulamalı projelerle öğren. Hooks, Redux, Webpack, Firebase ve Fazlası.",
            resim:"4.jpg",
            anasayfa:false,
            durum:true
        },
    ]
}

router.use( "/blogs/:blogid", (req ,res) => {
    res.render("users/blogDetails")
}  )

router.use( "/blogs", (req ,res) => {
    db.query("select * from blog where onay=1")
        .then(result => {
            res.render("users/blogs" , {
                title:"Tüm Kurslar",
                blogs:result[0], 
                categories: data.categories
            })
        }) 
        .catch(err => {
            console.log(err);
        }) 
}  )

router.use( "/", (req ,res) => {
    db.query("select * from blog where onay=1 and anasayfa=1") 
        .then(result => {
            res.render("users/index" , {
                title:"Popüler Kurslar",
                blogs:result[0], 
                categories: data.categories
            })
        }) 
        .catch(err => {
            console.log(err);
        }) 
}  )
module.exports= router

// biz select * ile tüm verileri getiriyoruz, getirdikten sonra filitreleme işlemi yapıyoruz 99988989 tane veri olsa 99988989 tanesini de çekecek. Ama biz çekerken filitreleme işlemi yaparsak bize lazım olan kadar veri çekmiş olacağız. Bunun içinde
// where = diyerek biz tablodaki veriye koşul ekliyebiliyoruz.

//boolean değerin karşılığı aslında 0 1 dir -> 1 = true , 0 = false

// db.query("select * from blog where onay=1 and anasayfa ")  -> iki koşuluda sağlasın istiyorsak AND
// db.query("select * from blog where onay=1 && or anasayfa ") -> iki koşuldan biri sağlanırsa da olur demek istiyorsak OR 
