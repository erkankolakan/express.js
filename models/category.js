const {DataTypes} = require("sequelize");
const sequelize = require("../data/db") //Sequelize ile veri tabanına bağlandığımız kısmı burada çağırıyoruz. Db den yani bu çağırıdığımızdan bize sequelize gelir. 

const Category = sequelize.define("blog" , { //2. parametrede kolon detaylarını veriyoruz
    category_id:{ //burada id nin alacağı özellikleri yazıyoruz. Örenğin allowNull boş geçilemez olsun.
        type: DataTypes.INTEGER,
        autoIncrement:true, //otomatik artan değer için kullanılır
        allowNull:false, //boş geçilemez
        primaryKey:true, //her bir değer kendine özel
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false, //baslik değeri boş geçilemez olsun.
    },

    
})

module.exports = Category; //blog bigisini dışarda kullanacağımız için gelip bu şekilde export ediyoruz. 

