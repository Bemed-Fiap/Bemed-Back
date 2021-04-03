import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';
import moment from 'moment';
import IToken from '../models/interfaces/token.interface';
import SecurityRoles from '../utils/security-roles.type';
import env from 'dotenv';
import ILogin from '../models/interfaces/login.interface';
env.config();

const TOKENEXPIRATION = process.env.TOKENEXPIRATION || 10;

export default class TokenService {
    async Gerar(loginData: ILogin): Promise<string> {
        const tokenData: IToken = {
            expires: moment().add(TOKENEXPIRATION, 'minute').toDate(),
            roles: [SecurityRoles.UsuarioPessoaFisica],
            usuarioEmail: loginData.usuario,
            usuarioId: loginData._id
        }
        const tokenStructString = JSON.stringify(tokenData);
        let secretKey = uuid.v4();
        secretKey = secretKey.toString().replace(/-/g, '');
        secretKey = [secretKey, secretKey.split('').reverse().join('')];
        const cryptoValue = CryptoJS.AES.encrypt(tokenStructString, secretKey[0]);
        return cryptoValue.toString() + secretKey[1];
    }

    async Decifrar(token: string): Promise<IToken> {
        token = token.toString();
        const trustCipher = token.substring(0, token.length - 32);
        let trustKey = token.substring(trustCipher.length);
        trustKey = trustKey.split('').reverse().join('');
        const descryptedByte = CryptoJS.AES.decrypt(trustCipher, trustKey);
        const originalText = descryptedByte.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText.toString()) as IToken;
    }
}