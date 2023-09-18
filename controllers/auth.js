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