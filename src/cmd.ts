// const CryptoJS = require('crypto-js');
// const uuid = require('uuid');
// import { BemedSecurity } from './utils/bemed.security';
// const security = new BemedSecurity();

// function GerarTokenUsuario(usuario, email, authenticado, secretKey) {

//     var tokenStructArray = [usuario, email, authenticado];
//     var tokenStructString = tokenStructArray.join(',');
//     if (!secretKey) secretKey = uuid.v4();
//     secretKey = secretKey.toString().replace(/-/g, '');
//     secretKey = [secretKey, secretKey.split('').reverse().join('')];
//     var cryptoValue = CryptoJS.AES.encrypt(tokenStructString, secretKey[0]);
//     console.log(cryptoValue.toString());
//     console.log(secretKey);

//     return cryptoValue.toString() + secretKey[1];
// }

// function BemedDecryptToken(encryptedValue) {
//     encryptedValue = encryptedValue.toString();

//     var trustCipher = encryptedValue.substring(0, encryptedValue.length - 32);
//     var trustKey = encryptedValue.substring(trustCipher.length);
//     trustKey = trustKey.split('').reverse().join('');

//     var descryptedByte = CryptoJS.AES.decrypt(trustCipher, trustKey);
//     var originalText = descryptedByte.toString(CryptoJS.enc.Utf8);
//     return originalText.toString();
// }


// function Encrypt(valor, salt) {
//     var cryptoValue = CryptoJS.AES.encrypt(valor, salt);
//     return cryptoValue.toString();
// }

// function Decrypt(encryptedValue, salt) {
//     var dec = CryptoJS.AES.decrypt(encryptedValue, salt);
//     var originalText = dec.toString(CryptoJS.enc.Utf8);
//     return originalText.toString();
// }


// var x1 = GerarTokenUsuario('michel', 'mail@mail.com', 'sim', uuid.v4());
// console.log('x1', x1);

// var y1 = BemedDecryptToken(x1);
// console.log('y1', y1);

// var x = security.Criptografar('abc123', '0011223344556677');
// console.log('enc', x);

// var y = security.Descriptografar(x, '0011223344556677');
// console.log('dec', y);


import moment from 'moment';

var dt1 = moment(new Date(2021, 2, 1, 23, 20, 0));
var dt2 = moment(new Date(2021, 2, 1, 23, 21, 0));

console.log(dt1 > dt2);
console.log(dt2 > dt1);

console.log(dt1);
console.log(dt2);