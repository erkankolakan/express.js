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

exports.get_logout = async(req , res) => {
    try {
        res.clearCookie("isAuth") //key ismini veriyoruz ve bunu siliyor.Buna tıkladığım anda kullanıcının tarayıcısında tanımlı olan cookie silinir

        return res.redirect("/account/login")

    } catch (error) {
        console.log(error);
    }
}

exports.post_login = async(req , res) =>{

    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await User.findOne({
            where:{
                email:email 
            }
        })

        if (!user) { //girilen email yanlış ise
            return res.render("auth/login", {
                title:"login",
                message:"email hatalı :("
            })
        }

        const match = await bcrypt.compare(password , user.password)


        if(match){ 
        //response bizim uygulmamamıza bir qookie gönderecek
        //İlk parametre key değeri ikinci value değeri, 0 başarısız giriş 1 başarılı giriş istersen bdeğerlerde verebilirsin.
        res.cookie("isAuth" , 1)  
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

/*
    Cookies 
kullanıcı başarılı bir şekilde giriş yaptıysa giriş bilgilerini tekrar tekrar kullanıcıdan almak yerine cookie login olma durumunu biyerde depolamak gerekiyor. Bunlardan biri COOKİE ancak cookie güvenlik açısından kullanılmaması gereken bir yöntem.
Cookie kullanıcının tarayıcısında bir bilgi saklamak istediğimiz zaman kullanıyoruz. Örneğin uygulamamızı kullanan kullanıcı arama yapmıştır ve bu arama sonucunda aslında biz o kullanıcının hangi ürünlerle ilgilendiğini biliriz ve daha sonra geldiğinde de daha önde çıkararak kullanıcının bunu ürünü almasını sağlayabiliriz.  

NODE.JS uygulamasında cooki yüklü olarak gelmiyor, bu bir npm paketi ve ve bunu kullanmak istediğimiz zaman bunu kurmamız gerekiyor. 

*/

