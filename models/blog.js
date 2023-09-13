const {DataTypes} = require("sequelize");
const sequelize = require("../data/db") //Sequelize ile veri tabanına bağlandığımız kısmı burada çağırıyoruz. Db den yani bu çağırıdığımızdan bize sequelize gelir. 

const Blog = sequelize.define("blog" , { //2. parametrede kolon detaylarını veriyoruz
    blogid:{ //burada id nin alacağı özellikleri yazıyoruz. Örenğin allowNull boş geçilemez olsun.
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    baslik:{
        type: DataTypes.STRING,
        allowNull:false, //baslik değeri boş geçilemez olsun.
    },
    altbaslik:{
        types:DataTypes.STRING,
        allowNull:false
    },
    aciklama:{
        types:DataTypes.TEXT,
        allowNull:true //aciklama bilgisi boş geçilebilir.
    },
    resim:{
        type:DataTypes.STRING,// Resim bilgisi ne olarak gelicek string mi text mi sayı mı boolean mi ???
        allowNull:false
    },
    anasayfa:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    categoryid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    eklemeTarihi:{
        type:DataTypes.DATETIME,
        dafeultValue: DataTypes.NOW //o an bir değer göndermek zorunda değiliz bu yazdığımız değer o anki tarih ve saati not alır.
    },
    
})
module.exports = Blog; //blog bigisini dışarda kullanacağımız için gelip bu şekilde export ediyoruz. 

/*
 type: DataTypes.INTEGER yazmamızın sebebi Sequelize, veritabanında her bir sütunun veri türünü bilmelidir. Bu, sütunun hangi türdeki verileri saklayacağını ve nasıl işleyeceğini belirlemesine yardımcı olur. type özelliği, bu veri türünü belirlemenize yardımcı olur. Örneğin, DataTypes.INTEGER veri türü, sütunun tam sayı değerlerini tutacağını belirtir. Bu sayede Sequelize, bu sütunu tam sayı değerlerini bekleyen bir sütun olarak oluşturur.
*/