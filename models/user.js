// User bilgilerini depolamak için user adında yeni bir tablo oluşturuyoruz.
const { Model } = require("sequelize");
const  sequelize  = require("../data/db");
const  DataTypes  = require("sequelize");
const bcrypt = require('bcrypt');


const User = sequelize.define("user" ,{  

    fullname:{
        type: DataTypes.STRING,
        allowNull: false,
        /* allowNull bir kısıtlma sağlamaz biz formu boş göndersek de boş bir string değer gelir bu yüzden de bize bir hata vermez*/
        validate:{
        // her hangi bir alana validation kuralı eklemek için validation değerlerini kullanmamız gerekir.
            notEmpty: { //boş bir string gönderilemez
                msg:"ad soyad girmelisiniz"
            },
                
            isFullname(value){ //biz full nameyi kontrol edicez bize value değeri gelicek. Tabiki gelen value kullanıcının fullnameye atamış olduğu değere denk geliyor.
                if (value.split(" ").length < 2) {
                    throw new Error("Lütfen ad ve soyadınızı giriniz.")
                }
        }
        },


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
        allowNull: false,
        validate:{
            notEmpty:{
                msg:"Lütfen bir parola değeri giriniz"
            },
            len:{
                args:[5.10],
                msg:"parola 5-10 değerili uzunluğunda olmalıdır"
            }
        }
    },
    resetToken:{
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration:{
        type: DataTypes.DATE,
        allowNull: true
    }

},{ timestamps: true });

User.afterValidate(async (user) => {
    //user kullanıcının oluşturmuş olduğu user modelidir.
    user.password = await bcrypt.hash(user.password,10)
    //userdan gelen modeli hashle daha sonra yine user içine at
    //biz şifreyi hashledikten sonra validate oldğu için afterValidate yani ilk validate yapalım ondan sonra şifreyi hashle. Adam şifre yazmazsa boş değer gelicek onu hashliyicek bu yüzden de şifre değeri girilmiş giibi gözükücek

})

module.exports = User;