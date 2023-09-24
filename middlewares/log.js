module.exports = (err, req, res, next) =>{
    console.log("loglama" , err.message); //==>> bu süreçte loglama yapılabilir. ör/ winston kütüphanesi bunun içindir. !!!! yada burada email işlemi yapabiliriz. Gelen hataları kendi email adresime gönderirim Bu sayede hataları öğrenedek uygulama üzerinde düzeltmeler yapılabilir.

    next(err) // hatalarla işimiz bir alttaki middlewarede bitecek, o yüzden bura da next(err) diyerek bir sonraki middleware ye geç demiş oluyoruz. next derken içerisine err yazmamız gerekir çünkü biz next() dersek süreç devam eder bir sonraki middlewareye geç deriz ama hatayı silmiş oluruz.
}