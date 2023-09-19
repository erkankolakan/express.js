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
        await req.session.destroy() //cookie bilgisi silinir.
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

        //cookie res üzerinden erişiyorduk. SESSİON da ise req üzerinden yazdırıyoruz.

        if(match){ 
        //response bizim uygulmamamıza bir qookie gönderecek
        //İlk parametre key değeri ikinci value değeri, 0 başarısız giriş 1 başarılı giriş istersen bdeğerlerde verebilirsin.
        req.session.isAuth=1    //biz bu aşamada bir session oluşturmuş oluyoruz. isAuth keyine ait 1 valude değerine sahip bir session
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