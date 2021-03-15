import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';
import moment from 'moment';
import { IToken } from '../models/interfaces/token.interface';

export class TokenService {
    async Gerar(dadosSalvar: string[]): Promise<string> {
        const tokenData: IToken = {
            data: dadosSalvar,
            authenticated: true,
            expires: moment().add(1, 'minute').toDate()
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