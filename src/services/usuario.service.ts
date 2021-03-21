import { Request, Response } from 'express';
import IUsuario from "../models/interfaces/usuario.interface";
import UsuarioRepository from '../database/usuario.repository';
import UsuarioBuilder from './../models/usuario.builder';
import BemedSecurity from '../utils/bemed.security';
import IUsuarioSecurity from "../models/interfaces/usuario.security.interface";
import CarteiraService from './carteira.service';
import TransacaoService from './transacao.service';
import ICarteira from "../models/interfaces/Carteira.interface";

const _usuarioRepository = new UsuarioRepository();
const _security = new BemedSecurity();
const _carteiraSevice = new CarteiraService();
const _transacaoSevice = new TransacaoService();

class IUsuarioServiceResponse {
    Usuario: IUsuario
    Carteira: ICarteira
}

export default class UsuarioService {

    async Get(request: Request, response: Response): Promise<Response<IUsuarioServiceResponse[]>> {
        const { id } = request.params;
        const { nome } = request.query;

        let result: any[];

        if (id) { result = [await _usuarioRepository.GetById(id)]; }
        else if (nome) { result = await _usuarioRepository.Many({ nome: nome }); }
        else { result = await _usuarioRepository.All(); }
        for (var u of result) {
            u.Carteira = await _carteiraSevice.GetByUsuario(u);
        }
        return response.json(result);
    }

    async Post(request: Request, response: Response): Promise<Response<IUsuarioServiceResponse>> {
        const builder = new UsuarioBuilder();
        const usuarioRequest = request.body;

        const usuario = builder
            .setDocumento(usuarioRequest.documento)
            .setEmail(usuarioRequest.email)
            .setEndereco(usuarioRequest.endereco)
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

        const usuariosEncontrados = await _usuarioRepository.Many({ email: usuario.email });

        if (usuariosEncontrados.length > 0) {
            const carteira = await _carteiraSevice.GetByUsuario(usuariosEncontrados[0]);
            result.Usuario = usuariosEncontrados[0];
            result.Carteira = carteira;
            return response.json(result);
        }

        const usuarioSeguro = await _security.GerarUsuarioSeguro(<IUsuarioSecurity>usuario);
        const usuarioSalvo: IUsuario = await _usuarioRepository.Insert(<IUsuario>usuarioSeguro);
        result.Usuario = usuarioSalvo;

        if (usuarioSalvo._id) {
            const carteira = await _carteiraSevice.CriarCarteira(usuario);
            const transacao = await _transacaoSevice.Depositar(carteira._id, '', 500, '', 0);
            result.Carteira = carteira;
        }

        return response.json(result);
    }
}

/*
builder
.setDocumento('10101010133')
.setEmail('mail@mail.com')
.setEndereco(enderecoBuilder
    .setCep('09999999')
    .setComplemento('Bloco x Apto y')
    .setInfo('Próximo ao metro z')
    .setNumero(41)
    .setRua('Rua A')
    .setBairro('Bairro B')
    .setCidade('Cidade C')
    .setEstado('Estado D')
    .Build())
.setNascimento(new Date(2000, 1, 1))
.setNome('Joãozitos')
.setSobrenome('Goianinhas')
.setUsuario('goianinha')
.Build()
*/