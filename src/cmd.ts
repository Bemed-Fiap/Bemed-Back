const CryptoJS = require('crypto-js');
const uuid = require('uuid');


function GerarTokenUsuario(usuario, email, authenticado, secretKey) {

    var tokenStructArray = [usuario, email, authenticado];
    var tokenStructString = tokenStructArray.join(',');
    if (!secretKey) secretKey = uuid.v4();
    secretKey = secretKey.toString().replace(/-/g, '');
    secretKey = [secretKey, secretKey.split('').reverse().join('')];
    var cryptoValue = CryptoJS.AES.encrypt(tokenStructString, secretKey[0]);
    console.log(cryptoValue.toString());
    console.log(secretKey);

    return cryptoValue.toString() + secretKey[1];
}

function BemedDecryptToken(encryptedValue) {
    encryptedValue = encryptedValue.toString();

    var trustCipher = encryptedValue.substring(0, encryptedValue.length - 32);
    var trustKey = encryptedValue.substring(trustCipher.length);
    trustKey = trustKey.split('').reverse().join('');

    var descryptedByte = CryptoJS.AES.decrypt(trustCipher, trustKey);
    var originalText = descryptedByte.toString(CryptoJS.enc.Utf8);
    return originalText.toString();
}


var x = GerarTokenUsuario('michel', 'mail@mail.com', 'sim', uuid.v4());
console.log(x);

var y = BemedDecryptToken(x);
console.log(y);


