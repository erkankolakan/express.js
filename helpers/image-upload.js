const multer = require("multer") 
const path = require("path")


const storage = multer.diskStorage({
    destination: (req , file, cb) => { //resmi nereye kaydedicez onu burada tanımlıyoruz.
        cb(null , "./public/images/") //callback fonksiyonunda ilk parametreye null diyerek hatayı boş geçiyoruz. 
    },
    filename: (req , file, cb) => {
        cb(null , path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname))
    } 
}) 

const upload = multer({
    storage: storage
})


    module.exports.upload = upload;

    /*
    * biz file.originalname dediğimiz zaman resim bilgisayara ne diye kayıtlıysa o ismiyle gelir ama çakışmalar olabilir.
    * path.parse(file.originalname).name bu şekilde yazdığımızda uzantısız bir şekilde sadece dosyanın ismini getirir ör/ erkan.jpg yi erkan diye getirir.
    * Biz Date.now diyerek o anki saliseyi alıyoruz bir nevi random bir sayı alıyoruz. Onun yerine random sayılar üretecek bir fonksyionda tanımlayabiliriz, ama onda da çakışmalar olabilir. Onun yerine saniye daha garanti bir yöntem.
    * Path.extname(file.originalname) jpg bilgisini tekrar eklemiş oluyoruz. 
    */
