import TransacaoBuilder from './../models/transacao.builder';
import TransacaoRepository from "../database/transacao.repository";
import CarteiraRepository from "../database/Carteira.repository";
import moment from "moment";
import TipoTransacao from "../utils/tipo-transacao.type";
import ITransacao from "../models/interfaces/transacao.interface";
import IProduto from '../models/interfaces/produto.interface';
import ICarteira from '../models/interfaces/Carteira.interface';
import IDesconto from '../models/interfaces/desconto.interface';

const _transacao = new TransacaoRepository();
const _carteira = new CarteiraRepository();

export default class TransacaoService {
    async Depositar(carteiraId: string, farmaciaId: string, valor: number, produtoId: string = null, produtoQuantidade: number = 0): Promise<ITransacao> {
        const _builder = new TransacaoBuilder();
        const transacao = await _transacao.Insert(_builder
            .setCarteiraDestinoId(carteiraId)
            .setFarmaciaId(farmaciaId)
            .setProdutoId(produtoId)
            .setQuantidadeProduto(produtoQuantidade)
            .setTipoTransacao(TipoTransacao.EntradaPontos)
            .setValor(valor)
            .setDtCriacao(moment().toDate())
            .setDtAlteracao(moment().toDate()).Build()
        );
        const add = await this.AddTransacaoNaCarteira(transacao);
        return transacao;
    }

    async Debitar(carteiraId: string, farmaciaId: string, valor: number, produtoId: string = null, produtoQuantidade: number = 0): Promise<ITransacao> {
        const _builder = new TransacaoBuilder();
        const transacao = await _transacao.Insert(_builder
            .setCarteiraDestinoId(carteiraId)
            .setFarmaciaId(farmaciaId)
            .setProdutoId(produtoId)
            .setQuantidadeProduto(produtoQuantidade)
            .setTipoTransacao(TipoTransacao.SaidaPontos)
            .setValor(valor)
            .setDtCriacao(moment().toDate())
            .setDtAlteracao(moment().toDate()).Build()
        );
        const add = await this.AddTransacaoNaCarteira(transacao);
        return transacao;
    }

    async CalcularPontos(produto: IProduto, quantidade: number, comBula: boolean, comReceita: boolean,
        comCaixa: boolean, comNotaFiscal: boolean, dentroDaValidade: boolean): Promise<number> {
        let pontosPorUnidade = produto.pontosPorUnidade * quantidade;
        let porcentagem = 1;

        if (comBula) porcentagem = porcentagem + 0.05;
        if (comCaixa) porcentagem = porcentagem + 0.05;
        if (comNotaFiscal) porcentagem = porcentagem + 0.05;
        if (comReceita) porcentagem = porcentagem + 0.05;
        if (dentroDaValidade) porcentagem = porcentagem + 0.1;

        return pontosPorUnidade + porcentagem;
    }

    async CalcularDesconto(carteira: ICarteira, preco: number): Promise<IDesconto> {
        const pts = carteira.pontos;
        if (pts > 0) {
            let desconto = pts / 10;
            let precoRecalculado = preco - desconto;

            if (precoRecalculado < 0) {
                precoRecalculado = 0;
                desconto = preco;
            }
            const ptsUtilizados = desconto * 10;
            return <IDesconto>{
                pontosGastos: ptsUtilizados,
                porcentagemDesconto: (desconto / preco) * 100,
                precoComDesconto: preco - desconto,
                precoTotal: preco,
                valorDesconto: desconto
            }
        } else {
            return <IDesconto>{
                pontosGastos: 0,
                porcentagemDesconto: 0,
                precoComDesconto: preco,
                precoTotal: preco,
                valorDesconto: 0
            }
        }
    }

    private async AddTransacaoNaCarteira(transacao: ITransacao): Promise<boolean> {
        const carteira = await _carteira.GetById(transacao.carteiraDestinoId);
        carteira.HistoricoTranscoes.push(transacao._id);
        carteira.dtAlteracao = moment().toDate();
        carteira.pontos = this.CalcularTransacao(carteira.pontos, transacao);
        await _carteira.Update({ _id: carteira._id, }, carteira);
        return true;
    }

    private CalcularTransacao(pontos: number, transacao: ITransacao): number {
        let result = pontos || 0;
        switch (transacao.tipoTransacao) {
            case TipoTransacao.EntradaPontos:
                result = result + (transacao.valor * 1);
                break;
            case TipoTransacao.SaidaPontos:
                result = result - (transacao.valor * 1);
                break;
        }
        return result;
    }
}
