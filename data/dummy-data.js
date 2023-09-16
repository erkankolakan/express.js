const Category = require("../models/category")
const Blog = require("../models/blog")

 const populate = async() => {
    
    const count = await Category.count() 

    if (count == 0) {
    

        await Category.bulkCreate([ 
            {name:"Web Geliştirme"},
            {name:"Mobil Uygulama Geliştirme"},
            {name:"Programlama"},
        ])

        await Blog.bulkCreate([
            {
                baslik:"Komple Uygulamalı Web Geliştirme Eğitimi",
                altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının   kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak   dinamik bir web uygulaması geliştirmiş oluruz.",
                resim:"1.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"2.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"3.jpg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
                altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
                aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
                resim:"4.jpg",
                anasayfa:true,
                onay:true,
            },
        ]
    )
}
}

    module.exports = populate;