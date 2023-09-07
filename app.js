// MİDDLEWARE nedir ve nasıl kullanılır -> 

const express = require("express");
const app = express(); 

    app.use( (req ,res, next) => {
        console.log("middleware 1");
        next()
    }  )

    app.use( (req ,res, next) => {
        console.log("middleware 2");
        res.end("middleware 2")  /*ya da res.send(<h1>home</h1>) diyerek sayfaya bir yazı yazı yazdırabilirdik  */
    }  )

// res.end dediğim zaman çalışma sürecine aslında son vermiş oluyoruz. Bu yüzden middlewre 1 den middleware 2 ye geçmiş olmuyor. Eğer ikisinde de end olmazsa yine middleware 2 ye geçmez bu seferde bir sonrakine geç diye bir komut vermediğimiz için middleware 1 de kalır. o yüzden 3. parametre olarak next parametresi alır. Buda bu fonksiyonda benim işim bitti bir sonrakine geç demek için kullanılır.

// Bu sefer fonksiiyondaki işlemleri yaptım sonra geç dedik bir sonraki fonksiyona geçti, 2. fonksiyonda da işlemi yaptırdık ve daha sonra da dur demiş olduk.

//middleware yi nerde kullanırız -> mesela biz gelen bir requestin herhangi bir özelliğine balabiliyorduk. mesela sayfa urlsi, method bilgisine bakabiliyoruz. Gelen bu req bilgisinde kullanıcının isteğine göre uygulamada herhangi bir code bloğunu çalıştırabiliyoruz. 

    
    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })


