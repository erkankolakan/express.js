const express = require("express");


const app = express(); // express aslında bizim için bir fonksiyonu bir uygulamayı ifade biz de atadığımız değer üzerinden ki burada atadığımız değer app'dir app üzerinden req ve res değerlerini kontol edeceğim.


    app.use( (req ,res) => {
        res.end("selam dunya") //uygulamaya herhangi bir sorgu geldiği zaman direk durdur cevabını verecektir.
    }  )

    
    //req talebi yapıldığı zaman bunu karşılayacak bir fonksiyona ihityaç var. bizde bunu !!! app.use !!! ile gelen req değerlerine karşılık res değerini döndüre biliriz.

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })































