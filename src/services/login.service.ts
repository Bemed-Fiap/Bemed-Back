import TokenService from './token.service';
import BemedSecurity from '../utils/bemed.security';
import ILogin from "../models/interfaces/login.interface";
import ILoginSecurity from "../models/interfaces/login.security.interface";

const _token = new TokenService();
const _security = new BemedSecurity();

export default class LoginService {
    async Login(id: string, documento: string, login: ILoginSecurity, senha: string): Promise<string> {

        const senhaDescriptografada = _security.Descriptografar(login.senha, login.salt);

        if (senhaDescriptografada == senha) {
            const login: ILogin = { _id: id, documento: documento };
            const token = await _token.Gerar(login);
            return token;
        }

        return null;
    }
}
