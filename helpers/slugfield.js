const slugify = require('slugify')

const options = {
    replacement: '-',  // boşlukları değiştirme karakteriyle değiştirin, varsayılan değer `-` olur
    remove: undefined, // normal ifadeyle eşleşen karakterleri kaldırın, varsayılan olarak "tanımsız"dır
    lower: true,       // küçük harfe dönüştürün, varsayılan olarak "false" olur
    strict: true,      // değiştirme dışındaki özel karakterleri çıkar; varsayılan değer "false"tır
    locale: 'tr',      // kullanılacak yerel ayarın dil kodu -->> tr yazarsan türkçe karakterleri de içerir
    trim: true         // Baştaki ve sondaki değiştirme karakterlerini kırpın, varsayılan olarak "true" olur
  };

  
  const slugifyField = (str, options) => {
    return slugify(str, options);
}

module.exports = slugifyField;

// slugify('some string') // some-string       //->> slugify tam olarak içine yazılan string ifadeyi aralarına bazı işaretler koyarak yazar.