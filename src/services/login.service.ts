import IUsuario from "./../models/interfaces/usuario.interface";
import UsuarioRepository from './../database/usuario.repository';
import TokenService from './token.service';
import BemedSecurity from '../utils/bemed.security';
import ILogin from "../models/interfaces/login.interface";

const _token = new TokenService();
const _security = new BemedSecurity();

export default class LoginService {
    async Login(usuario: IUsuario, senha: string): Promise<string> {

        const senhaDescriptografada = _security.Descriptografar(usuario.senha, usuario.salt);

        if (senhaDescriptografada == senha) {
            const login: ILogin = { _id: usuario._id, usuario: usuario.email };
            const token = await _token.Gerar(login);
            return token;
        }

        return null;
    }
}
