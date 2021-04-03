import IUsuario from "./../models/interfaces/usuario.interface";
import LoginService from './../services/login.service';
import UsuarioService from './../services/usuario.service';
import { Request, Response } from 'express';
import HttpStatusCode from "../utils/https-statuscode.type";

const _usuarioService = new UsuarioService();
const _loginService = new LoginService();

export default class LoginController {
    async Post(request: Request, response: Response): Promise<Response> {
        const { email, senha } = request.headers;
        const usuarios = await _usuarioService.BuscarPor(<IUsuario>{ email: email.toString() });

        if (usuarios.length == 0) return response.status(HttpStatusCode.BAD_REQUEST);
        if (usuarios.length > 1) return response.status(HttpStatusCode.CONFLICT);

        const usuario = usuarios[0] as IUsuario;

        const token = await _loginService.Login(usuario, senha.toString());

        if (token) {
            return response.json({ token });
        }

        return response.status(HttpStatusCode.FORBIDDEN);
    }
}
