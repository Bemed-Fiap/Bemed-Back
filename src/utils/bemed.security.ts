import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';
import IUsuario from '../models/interfaces/usuario.interface';
const secret = process.env.Secret || '0011223344556677';

export class BemedSecurity {

    // Encrypt(valor, salt) {
    //     var cryptoValue = CryptoJS.AES.encrypt(valor, salt);
    //     return cryptoValue.toString();
    // }

    // Decrypt(encryptedValue, salt) {
    //     var dec = CryptoJS.AES.decrypt(encryptedValue, salt);
    //     var originalText = dec.toString(CryptoJS.enc.Utf8);
    //     return originalText.toString();
    // }

    async GerarUsuarioSeguro(usuario: IUsuario): Promise<IUsuario> {
        usuario.salt = uuid.v4().toString().replace(/-/g, '').substring(0, 16);
        usuario.senha = this.Criptografar(usuario.senha, usuario.salt);
        return usuario;
    }

    Criptografar(valor: string, salt: string): string {
        console.log('Criptografando com a chave: ' + salt + secret);
        return CryptoJS.AES.encrypt(valor, salt + secret).toString();
    }

    Descriptografar(valor: string, salt: string): string {
        console.log('Descriptografando com a chave: ' + salt + secret);
        var decrypted = CryptoJS.AES.decrypt(valor, salt + secret);
        const originalText = decrypted.toString(CryptoJS.enc.Utf8);
        return originalText;
    }
}
/*
a1b8b15389074105
a1b8b153890741050011223344556677

a1b8b153890741050011223344556677
*/