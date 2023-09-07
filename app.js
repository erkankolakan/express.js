// HTML sayfalarının getirilmesi
const express = require("express");
const app = express(); 
const path = require("path") // -> path.join([...paths]): Belirtilen yolları birleştirir ve sonuç olarak tek bir yol döndürür. path çeşitli parametreler alabilir biz bu kısımda join kullanıyoruz ama
/* path path.resolve([...paths]): Belirtilen yolları çözümler ve mutlak bir yol döndürür. Çözümlenen yol, çalışma dizinine göre hesaplanır. Örneğin:
const absolutePath = path.resolve('dosya', 'altDosya', 'dosya.txt'); */

    app.use( "/blogs/:blogid", (req ,res, next) => {
        //global değişkenimiz var __dirname ve __fileName şeklinde 
        console.log(__dirname); // -> projenin bulunduğumuz klasör (ör/express.js)
        console.log(__filename); // -> o anda bulunduğumuz klasör (ör/app.js)

        res.sendFile(path.join(__dirname, "views/users","blogDetails.html")) //-> path.join ile dosyaları birleştiriyoruz.
       
    }  )

    app.use( "/blogs", (req ,res, next) => {
        res.sendFile(path.join(__dirname, "views/users","blogs.html"))
    }  )

    app.use( "/", (req ,res, next) => {
        res.sendFile(path.join(__dirname, "views/users","index.html"))
//senFile ile bir dosyayı çağırabiliyoruz biz tabilide buraya manuel olarak views/users/index html şekliden bir dizilim yapabilirdik ama bu 
    }  )

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })


