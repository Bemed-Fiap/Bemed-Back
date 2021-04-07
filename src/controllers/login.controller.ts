import IUsuario from "./../models/interfaces/usuario.interface";
import LoginService from './../services/login.service';
import UsuarioService from './../services/usuario.service';
import FarmaciaService from './../services/farmacia.service';
import { Request, Response } from 'express';
import HttpStatusCode from "../utils/https-statuscode.type";
import IFarmacia from "../models/interfaces/farmacia.interface";
import ILoginSecurity from "../models/interfaces/login.security.interface";

const _usuarioService = new UsuarioService();
const _farmaciaService = new FarmaciaService();
const _loginService = new LoginService();

export default class LoginController {
    async Post(request: Request, response: Response): Promise<Response> {
        const { documento, senha } = request.headers;
        let id = '';
        let role = '';
        let usuarios: any[];
        let usuario: any;
        
        if (documento.toString().length > 11) {
            usuarios = await _usuarioService.BuscarPor(<IUsuario>{ documento: documento.toString() });
            if (usuarios.length == 0) return response.status(HttpStatusCode.BAD_REQUEST);
            if (usuarios.length > 1) return response.status(HttpStatusCode.CONFLICT);
            usuario = usuarios[0];
            id = (<IUsuario>usuario)._id;
            role = 'Usuario';
        }
        else {
            usuarios = await _farmaciaService.BuscarPor(<IFarmacia>{ cnpj: documento.toString() });
            if (usuarios.length == 0) return response.status(HttpStatusCode.BAD_REQUEST);
            if (usuarios.length > 1) return response.status(HttpStatusCode.CONFLICT);
            usuario = usuarios[0];
            id = (<IFarmacia>usuario)._id;
            role = 'Farmacia';
        }

        const token = await _loginService.Login(id, documento.toString(), <ILoginSecurity> usuario, senha.toString());

        if (token) {
            return response.json({ token, role });
        }

        return response.status(HttpStatusCode.FORBIDDEN);
    }
}
