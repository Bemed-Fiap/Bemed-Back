import { Request, Response } from 'express';
import IUsuario from '../models/interfaces/usuario.interface';
import TransacaoService from '../services/Transacao.service';
import UsuarioService from '../services/usuario.service';
import FarmaciaService from '../services/farmacia.service';
import HttpStatusCode from '../utils/https-statuscode.type';
import ITransacao from "./../models/interfaces/Transacao.interface";
import TransacaoBuilder from './../models/Transacao.builder';

const _transacaoService = new TransacaoService();
const _usuarioService = new UsuarioService();

interface ITransacaoServiceResponse {
    mensagem: string,
    sucesso: boolean,
    Transacao: ITransacao
}

interface ITransacaoServiceRequest {
    documento: string,
    sucesso: boolean,
    Transacao: ITransacao
}

export default class TransacaoController {

    async EfetivarTransacaoDevolucao(request: Request, response: Response): Promise<Response<ITransacaoServiceResponse>> {
        try {

            const transacaoRequest = <ITransacaoServiceRequest>request.body;
            const usuario = await _usuarioService.BuscarPor(<IUsuario>{ documento: transacaoRequest.documento });
            const usuario = await _usuarioService.BuscarPor(<IUsuario>{ documento: transacaoRequest.documento });

            if (usuario.length > 0) response.sendStatus(HttpStatusCode.CONFLICT);

            const TransacaoSalvo = await _transacaoService.Depositar(usuario, );

            return response.json({
                Transacao: TransacaoSalvo,
                id: TransacaoSalvo._id.toString(),
                mensagem: 'Salvo com sucesso!',
                sucesso: true
            });

        } catch (e) {
            return response.json({
                Transacao: null,
                id: null,
                mensagem: 'Erro ao criar Transacao!',
                sucesso: false
            })
        }
    }
}
