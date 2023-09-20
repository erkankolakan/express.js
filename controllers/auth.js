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

        const user = await User.findOne({ where:{email:email} })

        if(user){
            req.session.message = {text: "Girdiğiniz email adresiyle daha önde kayıt olumuş." , class:"warning"};
            return res.redirect("login")
        }
        
        await User.create({ fullname:name, email: email, password: hashedPassword })

        req.session.message={text: "Hesabınıza giriş yapabilirsiniz" , class:"success"}
         return res.redirect("login")
        
    } catch (error) {
        console.log(error);
    }
}

exports.get_login = async(req , res) => {
    const message = req.session.message; // mesajı ekranda gösterir
    delete req.session.message //sonra ilgili sessionu siler destroy deseydik her session içindeki tüm değerleri silerdi.

    try {
        return res.render("auth/login" , {
            title: "login",
            message: message,
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
                message:{text:"email hatalı" , class:"danger"}
            })
        }

        const match = await bcrypt.compare(password , user.password)

        if(match){ 
        req.session.isAuth=true;
        req.session.fullname= user.fullname
        const url = req.query.returnUrl || "/"
        return res.redirect(url) 
        }

        return res.render("auth/login", {
            title:"login",
            message:{text:"Parola hatalı" , class:"danger"}
        })
        
    } catch (error) {
        console.log(error);
    }
  }