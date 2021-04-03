import { Request, Response } from 'express';
import IUsuario from "../models/interfaces/usuario.interface";
import UsuarioRepository from '../database/usuario.repository';
import BemedSecurity from '../utils/bemed.security';
import IUsuarioSecurity from "../models/interfaces/usuario.security.interface";
import CarteiraService from './carteira.service';
import TransacaoService from './transacao.service';
import ICarteira from "../models/interfaces/Carteira.interface";

const _usuarioRepository = new UsuarioRepository();
const _security = new BemedSecurity();
const _carteiraSevice = new CarteiraService();
const _transacaoSevice = new TransacaoService();



export default class UsuarioService {
    async BuscarPorId(id: string): Promise<IUsuario> {
        return await _usuarioRepository.GetById(id);
    }

    async BuscarPor(usuario: IUsuario): Promise<IUsuario[]> {
        return await _usuarioRepository.Many(usuario);
    }

    async BuscarTodos(): Promise<IUsuario[]> {
        return await _usuarioRepository.All();
    }

    async Criar(usuario: IUsuario): Promise<IUsuario> {

        const usuariosEncontrados = await _usuarioRepository.Many({ email: usuario.email });

        if (usuariosEncontrados.length > 0) {
            _carteiraSevice.CriarCarteira(usuariosEncontrados[0]);
            return usuariosEncontrados[0];
        }

        const usuarioSeguro = await _security.GerarUsuarioSeguro(<IUsuarioSecurity>usuario);
        const usuarioSalvo: IUsuario = await _usuarioRepository.Insert(<IUsuario>usuarioSeguro);

        if (usuarioSalvo._id) {
            const carteira = await _carteiraSevice.CriarCarteira(usuario);
            const transacao = await _transacaoSevice.Depositar(carteira._id, '', 500, '', 0);
        }

        return usuarioSalvo;
    }
}
