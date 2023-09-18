/* Authentication, bu dosya bizim için controllers olacak. */

const User = require("../models/user");  //user tablosu

const bcrypt = require('bcrypt');

exports.get_register = async(req , res) => {
    try {
        return res.render("auth/register" , {
            title: "register"
        })
    } catch (error) {
        console.log(error);
    }
}
exports.post_register = async(req , res) =>{

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password,10)
    /* ilk parametre neyi hasleyeceği ikincisi ise şifrenin zorluk seviyesi */

    try {
        
        await User.create({
            fullname:name,
            email: email,
            password: hashedPassword
        })

        return res.redirect("login")
        
    } catch (error) {
        console.log(error);
    }

}


exports.get_login = async(req , res) => {
    try {
        return res.render("auth/login" , {
            title: "login"
        })
    } catch (error) {
        console.log(error);
    }
}
exports.post_login = async(req , res) =>{

    const email = req.body.email;
    const password = req.body.password;

    //user tablosunda bir kayıt var mı yok mu diye bir kontrol sağlıyoruz

    try {

        const user = await User.findOne({
            where:{
                email:email  //suer tablosundaki email ile girilen email aynımı
            }
        })

        if (!user) { //girilen email yanlış ise
            return res.render("auth/login", {
                title:"login",
                message:"email hatalı :("
            })
        }

        /*Burada normalde if yazılır ama buna gerek ama biz bir üst satırda kullancı gelmezse yoksa dedik ve içinde retun var fonksiyon retunu okuduğu anda alt satırları okumaz break komutu gibi aslında. Okumazsa sıkıntı yok zaten. */

        const match = await bcrypt.compare(password , user.password)
        //formdan girilan birinci parametre, veri tabanında hashlenmiş olarak bekleyen parametre. Compare diyerek şifrelenmiş parolayı çözer ve diğer ile karşılaştırır.   


        if(match){ //kullanıcı login oldu onu ana sayfaya gönder diyebiliriz
        return res.redirect("/") 
        }

        return res.render("auth/login", {
            title:"login",
            message:"parola hatalı :("
        })
        
    } catch (error) {
        console.log(error);
    }

}

