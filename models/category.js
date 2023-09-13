const {DataTypes} = require("sequelize");
const sequelize = require("../data/db") 

const Category = sequelize.define("category" , { 
    category_id:{ 
        type: DataTypes.INTEGER,
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true, 
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false, 
    },
},{
    timestamps:false // extra eklemiş olduğu times bilgisini kolondan silmek için kullanılır. Defalut olarak eklenen veri bilgilerini zamanını kendisi ekler o yüzden blogsta yazmış olduğumuz date özelliğini de eklememize gerek yok.
})

const  sync = async() => {  
    await Category.sync({force: true})
    console.log ("Category tablosu eklendi")  
 }
 //force = true dediğimizden dolayı, blog ve category bilgisini her çağırdığımızda veri tabanı bilgisin silinip tekrardan oluşmasına neden olacaktır. O yüzden burayı silebilir veya uygulamayı oluşturduğumuz aşamada test verileri de eklenebilir ancak blog üzerinden nasıl bir veri ekldiğini  bilelim ki biz rastgele 5 tane blog bilgisini eklemiş olsam her seferinde siler ve insert sorguşarını çalıştırabiliriz. Biz bu tablleleri tekrardan kullandığımız zaman test amaçlı eklemiş olduğumuz 5 tane tablenin silinip silinmemesi bizim için önemli olmaz. Ama bu sadece uygulmayı geliştirme aşamasında kullanılması gerekir, projenin yanınlanması söz konusu olduğunda bu gibi yöntemler kullanmıyor olmamız gerekir. Bunun yerine migrations kullanmamız gerekir. 
 sync()

 module.exports = Category;

