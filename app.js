const express = require("express");
//nodemon paketi ile projede bir değişiklik olduğu zaman otomatik bir şekilde serveri kendisi başlatsı diye kullanıyoruz.Bu paketi
// npx nodemon ile çalıştırıyoruz. nodemon varsayılan olraka app.js dosyasını çalıştırı eğer ki biz index.js dosyasını çalıştırmak isterkse
// npx nodemon index.js yazmamız gerekir
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start":"npx nodemon"
//   }, package.json da scrip kısmımız var biz her seferinde uzun uzun npx nodemone veya npx nodemone index.js yazmaktansa biz script içerisisene bir değişken ismiyle çalıştırmak istediğimiz komutu yazabiliriz. artık uzun uzun yazmaktansa npm start dememiz yeterli olacaktır.

const app = express(); 


    app.use( (req ,res) => {
        res.end("selam dunya ben massaka") 
    }  )

    
    //req talebi yapıldığı zaman bunu karşılayacak bir fonksiyona ihityaç var. bizde bunu !!! app.use !!! ile gelen req değerlerine karşılık res değerini döndüre biliriz.

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })


// dependencies kısmındaki pakerler projede kullanılan paketlerdir, ama ben projeyi geliştirirken çeşitli paketler kullanabilir bunların projeyi halka açarken fazla yer kaplamasın diye dependencies kısmında değilde uygulamayı geliştirken kullanılan dev-dependencies kısmında tutulması lazım. Orada tutabilmek içinde npm i paket-adi --save-dev şeklinde yapmamız gerekir. Bu sayade sadece projemi paylaşırken dependecies kısmındaki dosyaları paylaşmama eterli olacaktır.
