import IUsuario from "../models/interfaces/usuario.interface";
import { UsuarioRepository } from '../database/usuario.repository';
import { UsuarioBuilder } from './../models/usuario.builder';
import { BemedSecurity } from '../utils/bemed.security';
import { Request, Response } from 'express';
import IUsuarioSecurity from "../models/interfaces/usuario.security.interface";
import { CarteiraService } from './carteira.service';
import { TransacaoService } from './transacao.service';

const _usuarioRepository = new UsuarioRepository();
const _security = new BemedSecurity();
const _builder = new UsuarioBuilder();
const _carteiraSevice = new CarteiraService();
const _transacaoSevice = new TransacaoService();

export class UsuarioService {

    async Get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { nome } = request.query;

        let result: any[];

        if (id) { result = [await _usuarioRepository.GetById(id)]; }
        else if (nome) { result = await _usuarioRepository.Many({ nome: nome }); }
        else { result = await _usuarioRepository.All(); }
        for(var u of result) {
            u.Carteira = await _carteiraSevice.GetByUsuario(u);
        }
        return response.json(result);
    }

    async Post(request: Request, response: Response): Promise<Response> {
        const usuario = request.body as IUsuario;

        const usuariosEncontrados = await _usuarioRepository.Many({ email: usuario.email });

        if (usuariosEncontrados.length > 0) {
            UsuarioBuilder.ConverterInterface(usuariosEncontrados[0]);
            return response.json(usuariosEncontrados[0]);
        }

        const usuarioSeguro = await _security.GerarUsuarioSeguro(<IUsuarioSecurity>usuario);
        UsuarioBuilder.ConverterInterface(<IUsuario>usuarioSeguro);
        const result: any = await _usuarioRepository.Insert(<IUsuario>usuarioSeguro);
        if (result._id) {
            const carteira = await _carteiraSevice.CriarCarteira(usuario);
            const transacao = await _transacaoSevice.Depositar(carteira._id, '', 500, '', 0);
            result.Carteira = carteira;
            result.Transacao = transacao;
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