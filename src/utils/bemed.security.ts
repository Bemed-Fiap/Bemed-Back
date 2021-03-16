import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';
import IUsuarioSecurity from '../models/interfaces/usuario.security.interface';
import env from 'dotenv';
env.config();

const secret = process.env.SECRET || '0011223344556677';

export class BemedSecurity {

    async GerarUsuarioSeguro(usuario: IUsuarioSecurity): Promise<IUsuarioSecurity> {
        usuario.salt = uuid.v4().toString().replace(/-/g, '').substring(0, 16);
        usuario.senha = this.Criptografar(usuario.senha, usuario.salt);
        return usuario;
    }

    Criptografar(valor: string, salt: string): string {
        return CryptoJS.AES.encrypt(valor, salt + secret).toString();
    }

    Descriptografar(valor: string, salt: string): string {
        var decrypted = CryptoJS.AES.decrypt(valor, salt + secret);
        const originalText = decrypted.toString(CryptoJS.enc.Utf8);
        return originalText;
    }
}
