let CryptoJS =require('crypto-js');


encrypt =function(data,key){
    return CryptoJS.AES.encrypt(JSON.stringify(data),key).toString();
}

decrypt= function(text,key){
    try{
        const bytes= CryptoJS.AES.decrypt(text,key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }catch(err){
        console.error(err);
        return;
    }
}

module.exports = {
    encrypt,
    decrypt
};