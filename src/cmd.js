const CryptoJS = require('crypto-js');
const uuid = require('uuid');



function BemedEncrypt(valueToEncrypt, SecretKey) {
    SecretKey = [SecretKey, SecretKey.split('').reverse().join('')];
    var a = CryptoJS.enc.Utf8.parse(SecretKey[0]);
    var b = CryptoJS.enc.Utf8.parse(SecretKey[1]);
    var handMove = { keySize: 128 / 8, iv: b, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
    var edoTensei = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(valueToEncrypt), a, handMove);
    return edoTensei.toString() + SecretKey[0];
}

function BemedDencrypt(encryptedValue) {
    encryptedValue = encryptedValue.toString();
    var trustCipher = encryptedValue.substring(0, encryptedValue.length - 36);
    var trustKey = encryptedValue.substring(trustCipher.length);
    trustKey = trustKey.split('').reverse().join('');
    var edoTensei = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(trustCipher), trustKey);
    return edoTensei.toString();
}


var x = BemedEncrypt('123456789', uuid.v4());
console.log(x);

var y = BemedDencrypt(x);
console.log(y);
