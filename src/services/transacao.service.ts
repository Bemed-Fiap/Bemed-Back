import { TransacaoBuilder } from './../models/transacao.builder';
import { TransacaoRepository } from "../database/transacao.repository";
import { CarteiraRepository } from "../database/Carteira.repository";
import moment from "moment";
import TipoTransacao from "../utils/TipoTransacao";
import ITransacao from "../models/interfaces/transacao.interface";
import { ObjectId } from 'bson';

const _transacao = new TransacaoRepository();
const _carteira = new CarteiraRepository();
const _builder = new TransacaoBuilder();

export class TransacaoService {
    async Depositar(carteiraId: string, farmaciaId: string, valor: number, produtoId: string = null, produtoQuantidade: number = 0): Promise<ITransacao> {
        const transacao = await _transacao.Insert(_builder
            .setCarteiraDestinoId(carteiraId)
            .setFarmaciaId(farmaciaId)
            .setProdutoId(produtoId)
            .setQuantidadeProduto(produtoQuantidade)
            .setTipoTransacao(TipoTransacao.Entrada)
            .setValor(valor)
            .setDtCriacao(moment().toDate())
            .setDtAlteracao(moment().toDate()).Build()
        );
        const add = await this.AddTransacaoNaCarteira(transacao);
        return transacao;
    }

    async Debitar(carteiraId: string, farmaciaId: string, valor: number, produtoId: string = null, produtoQuantidade: number = 0): Promise<ITransacao> {
        const transacao = await _transacao.Insert(_builder
            .setCarteiraDestinoId(carteiraId)
            .setFarmaciaId(farmaciaId)
            .setProdutoId(produtoId)
            .setQuantidadeProduto(produtoQuantidade)
            .setTipoTransacao(TipoTransacao.Saida)
            .setValor(valor)
            .setDtCriacao(moment().toDate())
            .setDtAlteracao(moment().toDate()).Build()
        );
        const add = await this.AddTransacaoNaCarteira(transacao);
        return transacao;
    }

    private async AddTransacaoNaCarteira(transacao: ITransacao): Promise<boolean> {
        const carteira = await _carteira.GetById(transacao.carteiraDestinoId);
        carteira.HistoricoTranscoes.push(transacao._id);
        carteira.dtAlteracao = moment().toDate();
        carteira.pontos = this.CalcularPontos(carteira.pontos, transacao);
        await _carteira.Update({ _id: carteira._id, }, carteira);
        return true;
    }

    private CalcularPontos(pontos: number, transacao: ITransacao): number {
        let result = pontos || 0;
        switch (transacao.tipoTransacao) {
            case TipoTransacao.Entrada:
                result = result + (transacao.valor * 1);
                break;
            case TipoTransacao.Entrada:
                result = result + (transacao.valor * 1);
                break;
        }
        return result;
    }
}
