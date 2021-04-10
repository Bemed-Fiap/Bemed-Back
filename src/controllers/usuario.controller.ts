import { request, Request, Response } from 'express';
import ICarteira from '../models/interfaces/Carteira.interface';
import IUsuario from '../models/interfaces/usuario.interface';
import UsuarioBuilder from './../models/usuario.builder';
import UsuarioService from './../services/usuario.service';
import CarteiraService from './../services/carteira.service';
import HttpStatusCode from '../utils/https-statuscode.type';

const _usuarioService = new UsuarioService();
const _carteiraService = new CarteiraService();

interface IUsuarioServiceResponse {
    Usuario: IUsuario
    Carteira: ICarteira
}

export default class UsuarioController {
    async Get(request: Request, response: Response): Promise<Response<IUsuarioServiceResponse[]>> {
        const { id } = request.params;
        try {

            const { nome } = request.query;

            let result: IUsuarioServiceResponse[] = [];
            let usuarios: IUsuario[] = [];

            if (id) {
                const usr = await _usuarioService.BuscarPorId(id);
                if (usr) usuarios.push(usr);
            }
            else if (nome) { usuarios = await _usuarioService.BuscarPor(<IUsuario>{ nome: nome.toString() }); }
            else { usuarios = await _usuarioService.BuscarTodos(); }

            for (const u of usuarios) {
                const c = await _carteiraService.GetByUsuario(u);
                result.push({ Usuario: u, Carteira: c });
            }
            if (result.length > 0) return response.json(result);
            return response.sendStatus(HttpStatusCode.BAD_REQUEST);
        } catch (e) {
            return response.sendStatus(HttpStatusCode.BAD_REQUEST);
        }
    }

    async GetMe(request: Request, response: Response): Promise<Response<IUsuario>> {
        const id = request['usr'];
        const usr = await _usuarioService.BuscarPorId(id);
        return response.json(usr);
    }

    async Post(request: Request, response: Response): Promise<Response<IUsuarioServiceResponse>> {
        const builder = new UsuarioBuilder();
        const usuarioRequest = request.body;

        const usuario = builder
            .setDocumento(usuarioRequest.documento)
            .setEmail(usuarioRequest.email)
            .setEndereco(usuarioRequest.Endereco)
            .setNascimento(usuarioRequest.nascimento)
            .setNome(usuarioRequest.nome)
            .setSobrenome(usuarioRequest.sobrenome)
            .setSalt(usuarioRequest.salt)
            .setSenha(usuarioRequest.senha)
            .Build();

        const result: IUsuarioServiceResponse = {
            Usuario: null,
            Carteira: null
        };

        const usuarioSalvo = await _usuarioService.Criar(usuario);
        const carteiraUsuario = await _carteiraService.GetByUsuario(usuario);

        result.Carteira = carteiraUsuario;
        result.Usuario = usuarioSalvo;

        return response.json(result);
    }
}