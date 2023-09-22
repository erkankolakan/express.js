// User bilgilerini depolamak için user adında yeni bir tablo oluşturuyoruz.
const { Model } = require("sequelize");
const  sequelize  = require("../data/db");
const  DataTypes  = require("sequelize");


const User = sequelize.define("user" ,{  

    fullname:{
        type: DataTypes.STRING,
        allowNull: false,
        /* allowNull bir kısıtlma sağlamaz biz formu boş göndersek de boş bir string değer gelir bu yüzden de bize bir hata vermez*/
        validate:{
        // her hangi bir alana validation kuralı eklemek için validation değerlerini kullanmamız gerekir.
            notEmpty: { //boş bir string gönderilemez
                msg:"ad soyad girmelisiniz"
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            args: true, //true bilgisi unique için gitsin
            msg: "Bu email başkası tarafından kullanılıyor." 
        },
        // veri tabanında bir değerden bir tana olanlir ikincisini kabul etmez. erkan@gmail.com varsa ikinci bir ikişi gelip de erkan@gmail.com ile kayıt olamaz olmaya çalışırsa bize bir hata mesajı geri dönecektir. Biz gidip bunu manuel olarak elle yazmıştık buna kesinlikle gerek yok.
        validate:{
            // her hangi bir alana validation kuralı eklemek için validation değerlerini kullanmamız gerekir.
                notEmpty: { //boş bir string gönderilemez
                    msg:"email adresi girmelisiniz"
                },
        isEmail: {
            msg: "Emailinizi doğru girdiğinizden emin olun"
        } //-> girilen değer email formtında mı değil mi diye kontrol eder. Mutlaka yazılması gereken bir backEnd tarafında kontrol edilen bir alan.
            }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    resetToken:{
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration:{
        type: DataTypes.DATE,
        allowNull: true
    }

},{ timestamps: true })  

module.exports = User;