// Express Router -> bu derste express.js router kavramını öğrenelim ve app.js dosyası içerisinde bulunan rouute yapılarını ayrı bir module içerisine alalım ve tabiki projemiz büyüyor bu yüzden dolayı herşe düzenli olsun ki projeye müdahale ederken bir sıkıntı yaşamayalım. Yani app.js dosyası kalabalık hale gelmesin, bunları parçalayarak ayrı bir dosya içerisine alalım. 

const express = require("express");
const app = express(); 
const path = require("path") 
const userRoutes = require("./routes/user") //routeleri başka bir klasörde oluşturduk ve onları buraya çağırıyoruz.
const adminRoutes = require("./routes/admin") //routeleri başka bir klasörde oluşturduk ve onları buraya çağırıyoruz.

app.use("/libs" ,express.static(path.join(__dirname,"node_modules")))
app.use("/static",express.static(path.join(__dirname,"public")))


    app.use("admin",adminRoutes); //-> bu ksımda router modülünde tek tek yazmaktansa bu şekilde tek seferde admin yazmaj daha cazip :D
    app.use(userRoutes); //burda oluşturmuş olduğumuz routesleri bir middleware olarak çağırıyoruz. 

    app.listen(3000 , () => {
        console.log("Server started on port 3000");
    })

/*
yaptıklarımızı özetliyelim
app.js sayfası içerisinde yönetici veya kullanıcı için gerekli olan rooutes yapılarını tek tek app.js yazabiliriz ama karmaşıklık olmasın, okunabilirliği arttırmak için ayrı bir module içerisine alabiliriz ve daha sonra ana sayfamıza çağırabiliriz. 
Ayrı bir module içerisine aldığımzı zaman artık app üzerinden değil router üzerinden routes sistemimizi kuruyoruz.
router üzerinden çağırmamızın nedeni nede olsa biz uygulama içersine bir middleware eklemiş olmuyoruz. Route yapacapımız öğeleri ilk once express üzerinden çağırıdığımız router içersine atıyoruz ve daha sonra ana sayfamda bu kurmuş olduğum router düzenini bir middleware içerisine çağırıyoruz. 


*/

