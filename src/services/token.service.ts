import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';

export class TokenService {
    async Generate(dadosSalvar: string[]): Promise<string> {
        const tokenStructString = dadosSalvar.join(',');
        let secretKey = uuid.v4();
        secretKey = secretKey.toString().replace(/-/g, '');
        secretKey = [secretKey, secretKey.split('').reverse().join('')];
        const cryptoValue = CryptoJS.AES.encrypt(tokenStructString, secretKey[0]);
        return cryptoValue.toString() + secretKey[1];
    }

    async DecifrarToken(token: string): Promise<string[]> {
        token = token.toString();
        const trustCipher = token.substring(0, token.length - 32);
        let trustKey = token.substring(trustCipher.length);
        trustKey = trustKey.split('').reverse().join('');
        const descryptedByte = CryptoJS.AES.decrypt(trustCipher, trustKey);
        const originalText = descryptedByte.toString(CryptoJS.enc.Utf8);
        return originalText.toString().split(',');
    }
}