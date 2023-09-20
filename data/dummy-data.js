const Category = require("../models/category")
const Blog = require("../models/blog")

const slugiField = require("../helpers/slugfield")
const User = require("../models/user")
const Role = require("../models/role")

const bcrypt = require('bcrypt');


 const populate = async() => {
    
    const count = await Category.count() 

    if (count == 0) {
    
        const users = await User.bulkCreate([
            {fullname: "erkan kolakan" , email: "erkankolakanz@gmail.com" , password: await bcrypt.hash("kolakan34",10)},
            {fullname: "ahmet kaya" , email: "ahmetkaya@gmail.com" , password: await bcrypt.hash("kaya34",10)},
            {fullname: "memo kaya" , email: "memo@gmail.com" , password: await bcrypt.hash("kaya34",10)},
            {fullname: "ibo kaya" , email: "ibo@gmail.com" , password: await bcrypt.hash("kaya34",10)},
            {fullname: "taha kaya" , email: "taha@gmail.com" , password: await bcrypt.hash("kaya34",10)},
        ]);


        const roles = await Role.bulkCreate([
            {rolename: "admin"}, //yönetici
            {rolename: "moderator"}, //blog yazarı
            {rolename: "guest"} //misafir
        ])

        await users[0].addRole(roles[0]);  //-> moderator 
                                                            //-> 0. index hem moderator hemde admin
        await users[0].addRole(roles[1]);  //-> admin 
        await users[1].addRole(roles[1]);  //-> admin 
        await users[2].addRole(roles[1]);  //-> admin

        await users[3].addRole(roles[2]);  //-> guest
        await users[4].addRole(roles[2]);  //-> guest

        const categories = await Category.bulkCreate([ 
            {name:"Web Geliştirme" , url:slugiField("Web Geliştirme")},
            {name:"Mobil Uygulama Geliştirme" , url:slugiField("Mobil Uygulama Geliştirme")},
            {name:"Programlama" , url:slugiField("Programlama")},
        ])


        const blogs = await Blog.bulkCreate([
            {
                baslik:"Komple Uygulamalı Web Geliştirme Eğitimi",
                url:slugiField("Komple Uygulamalı Web Geliştirme Eğitimi"),
                altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının   kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak   dinamik bir web uygulaması geliştirmiş oluruz.",
                resim:"1.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugiField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"2.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"3.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"66666666666666666666666666666666666666666666",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"555555555555555555555555555555555555555",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"44444444444444444444444444444444444444",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"333333333333333333333333333333333",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"222222222222222222222222222222222",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"111111111111111111111111111111111111111111",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"cccccccccccccccccccccccccccccccce",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"ssssssssssssssssssssssssssssss",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"aaaaaaaaaaaaaaaaaaaaaaaaa",
                url:slugiField("Node.js ile Sıfırdan İleri Seviye Web Geliştirme"),
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            }
        ])

        await categories[0].addBlog(blogs[0]);

        await blogs[0].addCategory(categories[1]);
    await categories[0].addBlog(blogs[2]);
    await categories[0].addBlog(blogs[3]);
    await categories[0].addBlog(blogs[4]);
    await categories[0].addBlog(blogs[5]);
    await categories[0].addBlog(blogs[6]);
    await categories[0].addBlog(blogs[7]);
    await categories[0].addBlog(blogs[8]);
    await categories[0].addBlog(blogs[9]);
    await categories[0].addBlog(blogs[10]);
    await categories[1].addBlog(blogs[2]);
    await categories[0].addBlog(blogs[1]);
    await categories[2].addBlog(blogs[3]);


    // await categories[2].createBlog({
    //     baslik:"Yeni many to many özellikleriyle bir kategoriye yeni bir blog oluşturarak ekledim",
    //     url:slugiField("Yeni many to many özellikleriyle bir kategoriye yeni bir blog oluşturarak ekledim"),
    //     altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
    //     aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının   kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak   dinamik bir web uygulaması geliştirmiş oluruz.",
    //     resim:"1.jpg",
    //     anasayfa:true,
    //     onay:true,
    // })
}}
    module.exports = populate;