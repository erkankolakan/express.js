/* Authentication, bu dosya bizim için controllers olacak. */

const User = require("../models/user");  //user tablosu
const bcrypt = require('bcrypt');
const emailService = require("../helpers/send-mail");
const config = require("../config");
const {Op} = require("sequelize")

const cryto = require("crypto") //crypro node.js içerisinde olan bir yapı zaten. Direk kullanılabilir.

exports.get_register = async(req , res) => {
    try {
        return res.render("auth/register" , {
            title: "register"
        })
    } catch (err) {
        res.redirect("/500")
    }
}

exports.post_register = async(req , res , next) =>{

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    /* ilk parametre neyi hasleyeceği ikincisi ise şifrenin zorluk seviyesi */

    try {
        const  newuser = await User.create({ fullname:name, email: email, password: password })

        emailService.sendMail({
            from: config.email.from,  //kim tarafından gönderiliyor.
            to: newuser.email,  //mail kime gönderilecek
            subject: "Hesabınız oluşturuldu", //Mailin başlığı, konusu nedir.
            text: "Hesabınız başarılı bir şekilde oluşturulmuştur.",
        })

        req.session.message={text: "Hesabınıza giriş yapabilirsiniz" , class:"success"}
         return res.redirect("login")

    } catch (err) {

        let msg = "";
 
        if (err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError") {
 
        for (let e of err.errors ) {
            msg+= e.message + " "
        }
        
        return res.render("auth/register" , {
            title: "register",
            message: { text: msg, class:"danger" } 
        })

    }else{
        next(err)
        /* next parametresi aracılığıyla ben geriye bir res döndürmek yerine o anda başlayıp devam eden req içerisine hata bilgisini direk ekleyebilirim.
    catch a göndermiş olduğumuz hatayı biz next e gönderiyoruz . Süreç bitmeden önce bu hata objesini alıp app.js de eklemiş olduğumuz middleware aracılığyla ele alabiliriz. Bu middlewarenin diğerlerinden farklı aldığı ilk parametre hata oluyor err. Yani 4 tane parametre alan middleware bizim için hatayı ele alan bir middleware oluyor. (err, req, res, next)
        biz redirect yapmadığımız için hata sayfasıa gider ama url account/register olarak kalır. Bunu hangi sayfada yaparsa o sayfanın linkinde kalır.
    */
    }
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
    } catch (err) {
        next(err)
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
        const userRoles = await user.getRoles({
//kullanıcının user Rollerini alalım login olan kullanıcının getRols diyerek bilgilerini alalım.
            attributes:["rolename"],
            raw:true
        })
        req.session.roles = userRoles.map((role) => role["rolename"]); //geriye ["admin","moderator"] dizisini döndürür.
        req.session.isAuth=true;
        req.session.fullname= user.fullname;
        req.session.userid = user.id; //kullanıcı login olduğu zamani session içerisine userdi değişkenini user in id değerini atıyoruz.
        const url = req.query.returnUrl || "/"
        return res.redirect(url)
        }

        return res.render("auth/login", {
            title:"login",
            message:{text:"Parola hatalı" , class:"danger"}
        })
        
    } catch (err) {
        next(err)

    }
}

exports.get_logout = async(req , res) => {
    try {
        await req.session.destroy() //cookie bilgisi silinir.
        return res.redirect("/account/login")

    } catch (err) {
        next(err)

    }
}

exports.get_reset = async(req , res) => {

    const message = req.session.message
    delete req.session.message

    try {
        return res.render("auth/reset-password" , {
            title: "şifreni yenile",
            message:message
        })
    } catch (err) {
        next(err)

    }
}

exports.post_reset = async(req , res) => {

    const email = req.body.email;
    try {

        var token = cryto.randomBytes(32).toString("hex") //-> token bilgisini oluşturduk
        //-> 32 bitlik ve stringe çevrilmiş ve hexedebile de bir sayı dizisi alıyoruz.
        //-> biz email ile bir token göndereceğiz.
    
        const user = await User.findOne({where:{ email: email }}) //-> kullanıcının girdiği email adresi
    
        if (!user) {  //kayıt eşleşmiyorsa gerekli hatalar.
            req.session.message = { text: "Girdiğiniz bilgilere ait bir hesap bulunamadı.", class:"danger"};
            return res.redirect("reset-password")
        }

        //kayıt varsa.
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + (1000 * 60 * 60) //şimdiki sürenin üstüne 1 saat ekle. 1 saatlik bir token
        user.save() //üste yazmış olduklarımızı veritabanına kayıt et. 

        emailService.sendMail({
            from: config.email.from,  //kim tarafından gönderiliyor.
            to:email,  //mail kime gönderilecek
            subject: "Resetleme Şifreniz", //Mailin başlığı, konusu nedir.
            html: `
            <p>Parolanızı sıfırlamak için aşağıdaki linke tıklayınız.</p>
            <p>
                <a href="http://127.0.0.1:3000/account/new-password/${token}" a> Parolanı sıfırla </a>
            </p>
            `
        })

        req.session.message= {text: "Parolanızı sıfırlamak için epost adresinizi kontol ediniz", class:"success"}
        res.redirect("login")

    } catch (err) {
        next(err)

    }
}

exports.get_newpassword = async(req , res) => {

    const token = req.params.token  //url nin içindeki token bilgisini alıcaz ve veri tabanına bakıcaz böyle bir url var mı diye.
    
    try {
        const user = await User.findOne({
            where: {
                resetToken : token,
                resetTokenExpiration: {
                    [Op.gt]:Date.now() //Op.gt -> şuanki zaman veri tabandaki zamandan daha büyük olsun diyoru.
                }
            }
        })

        return res.render("auth/new-password" , {
            title: "new password",
            token:token,
            userId:user.id // parolayı güncellerken userId kontrolü de yapacağız. 

        })
    } catch (err) {
        next(err)
    }
}

exports.post_newpassword = async(req , res) => {

    const token = req.body.token;
    const userId = req.body.userId;
    const newpassword = req.body.password;

    try {

        const user = await User.findOne({
            where: {
                resetToken : token,
                resetTokenExpiration: {
                    [Op.gt]:Date.now() //Op.gt -> şuanki zaman veri tabandaki zamandan daha büyük olsun diyoru.
                },
                id:userId
            }
        })

        user.password = await bcrypt.hash(newpassword ,10) //gelen şifreyi hashliyoruz
        user.resetToken = null ;
        user.resetTokenExpiration=null;
        await user.save()         //yeni şifre bilgisi dataBaseye eklendi

        req.session.message = {text: "parolanız güncellendi" , class:"success"};
        return res.redirect("login")

    } catch (err) {
        next(err)
    }
}




