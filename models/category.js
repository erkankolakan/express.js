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
    timestamps:false 
})


const  sync = async() => {  
    await Category.sync({alter : true})
    console.log ("Category tablosu eklendi")  

    const count = await Category.count()

    if (count == 0) {

        await Category.bulkCreate([ //bu şekilde toplu oluşsturma işlemleri de yapabiliriz
        {name:"Web Geliştirme"},
        {name:"Mobil Uygulama Geliştirme"},
        {name:"Programlama"},
    ])

    }
 }

 sync()

 module.exports = Category;

/*
const c1 = Category.build({  -------// şuan uygulama tarafında oluşturduk xxx.save() dediğimiz zaman veri tabanına kaydeder. .save() demezsen burada kalır. 
    name:"Web Geliştirme" -------- // id eklememize gerek yok ztn üstde autoIncrement:true diyerek otomatik bir şekilde üretilmesini sağlarız. 
})

await c1.save();    ----------  //burası gerçekten çalışsın ondan sonra aşağı satıra insin diye await ekliyoruz.
console.log("c1 veri tabanına yazdırıldı")   ------------- // xxx.save() dediğimiz zaman veri tabanına kayedetmiş oluyoruz.
*/

/*
    await Category.create({name:"Web Geliştirme"})
    await Category.create({name:"Mobil Uygulama Geliştirme"})
    await Category.create({name:"Programlama"})
//create build den daha iyi çünkü nesneyi oluturup bir daha gidip extradan x.save() demeye gerek yok.
//Hatta const c1 = Category diyip bir değişken üzrinde veriyi tutmak zorunda da değiliz. 

bu şekilde tek tek yapmak yerine toplu oluşturma işlemi de yapabiliriz

 Category.bulkCreate([ ])

*/