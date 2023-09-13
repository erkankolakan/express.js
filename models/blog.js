const {DataTypes} = require("sequelize");
const sequelize = require("../data/db")  

const Blog = sequelize.define("blog" , { 
    blogid:{ 
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    baslik:{
        type: DataTypes.STRING,
        allowNull:false, 
    },
    altbaslik:{
        type:DataTypes.STRING,
        allowNull:false
    },
    aciklama:{
        type:DataTypes.TEXT,
        allowNull:true 
    },
    resim:{
        type:DataTypes.STRING,
        allowNull:false
    },
    anasayfa:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    categoryid:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

    //burda ki date bilgisini sildik zaten database bize otomatik bir şekilde ekliyor
    
})

 const  sync = async() => { //Üste oluşturmuş olduğumuz tabloyu veri tabanına gönderiyoruz.
    await Blog.sync({force: true})
    console.log ("Blog tablosu eklendi")
 }

 sync()

 module.exports = Blog;

/*
    user.sync dediğimiz zaman direk modele göre bir SQL scripti uygulama tarafında oluşturulur ve bu SQL e gönderilir. SQL database sağlayıcısna gönderilir ve ona göre SQL sorgusu aracılığıya bir tablo oluşturulur. Yani burda sequlize nin yaptığı, uygulama tarafında bir SQL sorgusunu createTable şeklinde eklemiş olduğumuz özelliklere göre tek tek oluşturmasıdır.   

    ** Usersync() - eğer öyle bir database tablosu yoksa oluşturulur, varsa data baseyi silmez 
    ** User.sync({ force: true }) - Eğer aynı isimli bir tablo veri tabanında varsa o tabloyu ilk başta siler ve tekrar oluşturulur. Sildiği içinde data tablosu içindeki tüm verileri kaybetmiş oluruz . Buda bize boş bir tablo döndürür. 
    ** User.sync({alter: true}) - Data  base tarafından tablo silmez iki tablo arasında ki değişiklikleri kontrol eder ve değişiklikleri veri tabanı tarafında güncelleme sorgusu olarak gönderir. 
    
    Biz bir uygulma yayınladığımız zaman yanlış birşeyler olursa verilerin hepsini kaybederiz, bu yöntemi biraz daha profosyönel bir şekilde ele almamız gerekir. 
    Profosyonel kullanımda Migrations ile olakcatır.  
*/