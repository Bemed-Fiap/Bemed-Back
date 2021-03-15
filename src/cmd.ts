// const CryptoJS = require('crypto-js');
// const uuid = require('uuid');
// const LZUTF8 = require('lzutf8');

// import { BemedSecurity } from './utils/bemed.security';
// import { TokenService } from './services/token.service';
// import moment from 'moment';
// import IUsuario from './models/interfaces/usuario.interface';
// const security = new BemedSecurity();
// const token = new TokenService();

// // var x = security.Criptografar('abc123', '0011223344556677');
// // console.log('enc', x);

// // var y = security.Descriptografar(x, '0011223344556677');
// // console.log('dec', y);



// (async () => {

//     const user: IUsuario = {
//         _id: "604ec1cbd31e217f00549d40",
//         Endereco: null,
//         documento: "10101010133",
//         email: "mail@mail.com",
//         nascimento: moment("2000-02-01T02:00:00.000Z").toDate(),
//         nome: "MICHEL",
//         sobrenome: "SANTANA",
//         senha: "U2FsdGVkX19xSwMvlK0wP1rA+h1bvubGWGZ0ucjUj/U=",
//         salt: "09775669901d40cb"
//     }


//     var c = LZUTF8.compress(JSON.stringify(user), { outputEncoding: 'ByteArray' });
//     c = c.toString();
//     console.log(c);
    
//     var t = security.Criptografar(c, '0011223344556677');
//     console.log(t);

//     console.log('███████');

//     var x = await token.Gerar(user);
//     console.log(x);

//     var dc = LZUTF8.decompress(c.split(','), { inputEncoding: 'ByteArray', outputEncoding: 'String' });
//     console.log(dc);


//     return;
   

//     var y = await token.Decifrar(x);
//     console.log(y);
// })();