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

interface ITransacaoProdutoRequest {
    idProduto: string;
    comBula: boolean;
    comReceita: boolean;
    comCaixa: boolean;
    comNotaFiscal: boolean;
    dentroDaValidade: boolean;
    quantidade: number;
}

interface ITransacaoRequest {
    documento: string;
    produtos: ITransacaoProdutoRequest[]
}

interface IDescontoRequest {
    documento: string;
    produtos: string[];
    precoTotal: number;
}

interface IDescontoResponse {
    documento: string;
    precoTotal: number;
    status: string;
    valorComDesconto: number;
}

export default class TransacaoController {

    async EfetivarTransacaoDevolucao(request: Request, response: Response): Promise<Response<ITransacaoServiceResponse>> {
        try {

            const transacaoRequest = <ITransacaoRequest>request.body;
            const idFarmacia = request['usr'];
            const usuarios = await _usuarioService.BuscarPor(<IUsuario>{ documento: transacaoRequest.documento });
            if (usuarios.length > 1) response.sendStatus(HttpStatusCode.CONFLICT);
            const usuario = <IUsuario>usuarios[0];
            const transacoesEfetivadas = [];
            const transacoesComErro = [];

            for (const devolucao of transacaoRequest.produtos) {
                const produto = await _produtoService.BuscarPorId(devolucao.idProduto);
                try {
                    const carteira = await _carteiraService.GetByUsuario(usuario);

                    const pontos = await _transacaoService.CalcularPontos(produto, devolucao.quantidade, devolucao.comBula, devolucao.comReceita,
                        devolucao.comCaixa, devolucao.comNotaFiscal, devolucao.dentroDaValidade);

                    const transacao = await _transacaoService.Depositar(carteira._id.toString(), idFarmacia, pontos,
                        produto._id, devolucao.quantidade);

                    transacoesEfetivadas.push(produto.nome);

                } catch {
                    transacoesComErro.push(produto.nome);
                }
            }

            return response.json({
                TransacoesEfetivadas: transacoesEfetivadas,
                TransacoesNaoEfetivadas: transacoesComErro,
                mensagem: 'Resultado das transações, recolha apenas as transações que foram efetivadas!',
                sucesso: true
            });

        } catch (e) {
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
        }
    }

    async AprovarDesconto(request: Request, response: Response): Promise<Response<ITransacaoServiceResponse>> { //Todo
        try {
            const descontoReq: IDescontoRequest = request.body;
            const idFarmacia = request['usr'];
            const usuarios = await _usuarioService.BuscarPor(<IUsuario>{ documento: descontoReq.documento });
            if (usuarios.length > 1) response.sendStatus(HttpStatusCode.CONFLICT);
            const usuario = <IUsuario>usuarios[0];

            const carteira = await _carteiraService.GetByUsuario(usuario);
            const calculoDesconto = await _transacaoService.CalcularDesconto(carteira, descontoReq.precoTotal);

            const t = await _transacaoService.Debitar(carteira._id, idFarmacia, calculoDesconto.pontosGastos, descontoReq.produtos.join(','));

            return response.json(<ITransacaoServiceResponse>{
                Transacao: t,
                mensagem: 'Pontos debitados com sucesso',
                calculoDesconto: calculoDesconto,
                sucesso: true
            });
        } catch (ex) {
            console.log(ex);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
        }
    }

    async VerDesconto(request: Request, response: Response): Promise<Response<IDescontoResponse>> {
        try {
            const descontoReq: IDescontoRequest = request.body;
            const usuarios = await _usuarioService.BuscarPor(<IUsuario>{ documento: descontoReq.documento });

            if (usuarios.length > 1) response.sendStatus(HttpStatusCode.CONFLICT);
            const usuario = <IUsuario>usuarios[0];

            const carteira = await _carteiraService.GetByUsuario(usuario);
            if (carteira.pontos > 0) {
                const calculoDesconto = await _transacaoService.CalcularDesconto(carteira, descontoReq.precoTotal);
                return response.json(<IDescontoResponse>{
                    documento: descontoReq.documento,
                    precoTotal: descontoReq.precoTotal,
                    status: calculoDesconto.porcentagemDesconto > 0 ? 'Desconto aprovado' : 'Sem pontos para aplicar desconto',
                    valorComDesconto: calculoDesconto.precoComDesconto
                });
            } else {
                return response.json(<IDescontoResponse>{
                    documento: descontoReq.documento,
                    precoTotal: descontoReq.precoTotal,
                    status: 'Sem pontos para aplicar desconto',
                    valorComDesconto: descontoReq.precoTotal
                });
            }

        } catch {
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();

        }
    }
}
