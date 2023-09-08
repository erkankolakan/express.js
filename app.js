// STATİK DOSYALAR -> statik dosyalarla çalışırken (css,html,js,img) bazı ayarlamalar yapmamız gerekir. Çünkü rastgele proje klasörleri erşime açık değildir. Bizim bu dosyaları erişime açmamız gerekir, yani ilgili statik dosyaların bir http talebi almaları gerekir bunun ektra bir ayara ihtiyacı var.
// Bunun bir middleware kullanıyoruz, express.js de app.use(express.static("açmakistediğimiz klasör ismini veriyoruz")) biz bu klasör isminine genelde public diyerek çağırıyoruz bu sayede altına yazmış olduğumuz css html js dosyaları public bir şekilde yayınlanabilir oluyor, ayar sayesinde public klasörüne erişim sağlanır. Bu klasörün içindeki dosyaları erişime açar.

const express = require("express");
const app = express(); 
const path = require("path") 

app.use("/libs" ,express.static("node_modules")) //-> public klasörü altındaki tüm dosyları erişime açtık. 
//app.use("/libs" , express.static("public")) -> dersek ilk parametre bizim erişime açtığımız dosyalara erişirken onlara takma isim vermemizi sağlıyor.
app.use("/static",express.static("public"))
/*
    bu şekilde erişimde zorlanıyorsak projenin ana dizininden direke erişebiliriz.
    app.use("xxx", express.static(path.join(__dirname , "node_modules yapabiliriz"))) 
    app.use("yyy" express.static(path.join(__dirname , "public")))
*/

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

    }  )

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })


