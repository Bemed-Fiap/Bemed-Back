import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';
import IUsuario from '../models/interfaces/usuario.interface';
import IFarmacia from '../models/interfaces/farmacia.interface';
import env from 'dotenv';
env.config();

const secret = process.env.SECRET || '0011223344556677';

export class BemedSecurity {

    async GerarUsuarioSeguro(usuario: IUsuario): Promise<IUsuario> {
        usuario.salt = uuid.v4().toString().replace(/-/g, '').substring(0, 16);
        usuario.senha = this.Criptografar(usuario.senha, usuario.salt);
        return usuario;
    }

    async GerarFarmaciaSeguro(farmacia: IFarmacia): Promise<IFarmacia> {
        farmacia.salt = uuid.v4().toString().replace(/-/g, '').substring(0, 16);
        farmacia.senha = this.Criptografar(farmacia.senha, farmacia.salt);
        return farmacia;
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
