import { Request, Response } from 'express';
import IUsuario from '../models/interfaces/usuario.interface';
import TransacaoService from '../services/Transacao.service';
import UsuarioService from '../services/usuario.service';
import ProdutoService from '../services/produto.service';
import CarteiraService from '../services/carteira.service';
import HttpStatusCode from '../utils/https-statuscode.type';
import ITransacao from "./../models/interfaces/Transacao.interface";

const _transacaoService = new TransacaoService();
const _usuarioService = new UsuarioService();
const _produtoService = new ProdutoService();
const _carteiraService = new CarteiraService();

interface ITransacaoServiceResponse {
    mensagem: string,
    sucesso: boolean,
    Transacao: ITransacao
}

interface ITransacaoRequest {
    documento: string;
    idProduto: string;

    comBula: boolean;
    comReceita: boolean;
    comCaixa: boolean;
    comNotaFiscal: boolean;
    dentroDaValidade: boolean;

    quantidade: number;
}

interface IDescontoRequest {
    documento: string;
    preco: number;
}
interface IDescontoResponse {
    documento: string;
    preco: number;
    status: string;
    valorComDesconto: number;
}

export default class TransacaoController {

    async EfetivarTransacaoDevolucao(request: Request, response: Response): Promise<Response<ITransacaoServiceResponse>> {
        try {

            const transacaoRequest = <ITransacaoRequest>request.body;
            const idFarmacia = request['usr'];
            const usuarios = await _usuarioService.BuscarPor(<IUsuario>{ documento: transacaoRequest.documento });
            if (usuarios.length > 0) response.sendStatus(HttpStatusCode.CONFLICT);
            const usuario = <IUsuario>usuarios[0];

            const produto = await _produtoService.BuscarPorId(transacaoRequest.idProduto);
            const carteira = await _carteiraService.GetByUsuario(usuario);

            const pontos = await _transacaoService.CalcularPontos(produto, transacaoRequest.comBula, transacaoRequest.comReceita,
                transacaoRequest.comCaixa, transacaoRequest.comNotaFiscal, transacaoRequest.dentroDaValidade);

            const transacao = await _transacaoService.Depositar(carteira._id, idFarmacia, pontos,
                produto._id, transacaoRequest.quantidade);

            return response.json({
                Transacao: transacao,
                id: transacao._id.toString(),
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

    async AprovarDesconto(request: Request, response: Response) { //Todo
        const descontoReq: IDescontoRequest = request.body;
        const usuarios = await _usuarioService.BuscarPor(<IUsuario>{ documento: descontoReq.documento });
        if (usuarios.length > 0) response.sendStatus(HttpStatusCode.CONFLICT);
        const usuario = <IUsuario>usuarios[0];

        const carteira = await _carteiraService.GetByUsuario(usuario);
        const valorComDesconto = carteira

        //_transacaoService.Debitar()
    }

    async VerDesconto(request: Request, response: Response) {
        
        const descontoReq: IDescontoRequest = request.body;
        const usuarios = await _usuarioService.BuscarPor(<IUsuario>{ documento: descontoReq.documento });

        if (usuarios.length > 0) response.sendStatus(HttpStatusCode.CONFLICT);
        const usuario = <IUsuario>usuarios[0];

        const carteira = await _carteiraService.GetByUsuario(usuario);
        const calculoDesconto = await _transacaoService.CalcularDesconto(carteira, descontoReq.preco);

        return <IDescontoResponse>{
            documento: descontoReq.documento,
            preco: descontoReq.preco,
            status: 'Desconto aprovado',
            valorComDesconto: calculoDesconto.precoComDesconto
        }
    }
}
