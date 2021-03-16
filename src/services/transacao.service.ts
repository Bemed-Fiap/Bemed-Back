import { CarteiraService } from "./../services/carteira.service";
import { TransacaoBuilder } from './../models/transacao.builder';
import { TransacaoRepository } from "../database/transacao.repository";
import IUsuario from "../models/interfaces/usuario.interface";
import moment from "moment";
import TipoTransacao from "../utils/TipoTransacao";
import ITransacao from "../models/interfaces/transacao.interface";

const _transacao = new TransacaoRepository();
const _builder = new TransacaoBuilder();
const _carteiraService = new CarteiraService();

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
        const add = await _carteiraService.AddTransacaoNaCarteira(transacao);
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
        const add = await _carteiraService.AddTransacaoNaCarteira(transacao);
        return transacao;
    }
}
