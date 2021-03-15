import IUsuario from "./../models/interfaces/usuario.interface";
import { UsuarioRepository } from './../database/usuario.repository';
import { UsuarioBuilder } from './../models/usuario.builder';
import { TokenService } from './token.service';
import { Request, Response } from 'express';
import { BemedSecurity } from '../utils/bemed.security';
import HttpStatusCode from "../utils/HttpStatusCode";

const _usuario = new UsuarioRepository();
const _token = new TokenService();
const _security = new BemedSecurity();
const _builder = new UsuarioBuilder();

export class LoginService {
    async Login(request: Request, response: Response): Promise<Response> {
        const { email, senha } = request.headers;
        const usuarios = await _usuario.Many({ email });

        if (usuarios.length == 0) return response.status(HttpStatusCode.BAD_REQUEST);
        if (usuarios.length > 1) return response.status(HttpStatusCode.CONFLICT);

        const usuario = usuarios[0] as IUsuario;

        const senhaDescriptografada = _security.Descriptografar(usuario.senha, usuario.salt);

        if (senhaDescriptografada == senha) {
            const token = await _token.Gerar(usuario);
            return response.json({ token });
        }

        return response.status(HttpStatusCode.FORBIDDEN)
    }
}
