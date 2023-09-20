const config = {
    db : {
        host: 'localhost',
        user: "root",
        password:"Kolakan21",
        database:"blogdb" //oluşturduğumuz server ismi, yenisinin ismi bloogdb olduğu için artık buraya blogdb yazmak yeterli olacaktır.
    },
    email: {
        username: "erkankolakan@gmail.com",
        password: "qwgavvvnfcinucid",
        from:"erkankolakan@gmail.com"
    }
}

module.exports = config;
//bağlantı bilgilerini başka sayfalarda kullanabilmek için başka sayfada kullanıyoruz.   