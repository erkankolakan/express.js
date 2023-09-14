const Category = require("../model/category")
const Blog = require("../model/blog")

 const populate = async() => {
    
    const count = await Category.count() //blog da ki bilgileri de sayabilir hiç önemli değil. Sonuç olarak değer yoksa değer ekliecek

if (count == 0) {
  
    if (count == 0) { //eğer category sayısı 0 sa demekki tablo olarak herhangi birşey eklenmemiş dolayısıyla category bilgisini veri tabanına ekleyebiliriz.

    await Category.bulkCreate([ //bu şekilde toplu oluşsturma işlemleri de yapabiliriz
        {name:"Web Geliştirme"},
        {name:"Mobil Uygulama Geliştirme"},
        {name:"Programlama"},
    ])
    }

    await Blog.bulkCreate([
        {
            baslik:"Komple Uygulamalı Web Geliştirme Eğitimi",
            altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
            aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının   kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak   dinamik bir web uygulaması geliştirmiş oluruz.",
            resim:"1.jpg",
            anasayfa:true,
            onay:true,
            categoryId:1 //bunlarda otomatik bir şekilde model ismi ve Büyük harfle Id gelir ->> xxxxId
        },
        {
            baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
            resim:"2.jpg",
            anasayfa:true,
            onay:true,
            categoryId:1
        },
        {
            baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
            resim:"2.jpg",
            anasayfa:true,
            onay:true,
            categoryId:2
        },
        {
            baslik:"Node.js ile Sıfırdan İleri Seviye Web Geliştirme",
            altbaslik:"Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.",
            aciklama:"En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın!",
            resim:"2.jpg",
            anasayfa:true,
            onay:true,
            categoryId:3
        },
    ]
)
}
}

    module.exports = populate;