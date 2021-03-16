import ICarteira from "./../models/interfaces/Carteira.interface";
import { CarteiraRepository } from './../database/Carteira.repository';
import { CarteiraBuilder } from './../models/Carteira.builder';
import IUsuario from "../models/interfaces/usuario.interface";
import moment from "moment";
import ITransacao from "../models/interfaces/transacao.interface";
import TipoTransacao from "../utils/TipoTransacao";

const _carteira = new CarteiraRepository();
const _builder = new CarteiraBuilder();

export class CarteiraService {
    async CriarCarteira(usuario: IUsuario): Promise<ICarteira> {
        const carteira = await _carteira.Insert(_builder
            .setUsuarioId(usuario._id)
            .setDtCriacao(moment().toDate())
            .setDtAlteracao(moment().toDate())
            .setHistoricoTranscoes([]).Build()
        );
        return carteira;
    }

    async AddTransacaoNaCarteira(transacao: ITransacao): Promise<boolean> {
        const carteira = await _carteira.GetById(transacao.carteiraDestinoId);
        carteira.HistoricoTranscoes.push(transacao._id);
        carteira.dtAlteracao = moment().toDate();
        carteira.pontos = this.CalcularPontos(carteira.pontos, transacao);
        await _carteira.Update(carteira._id, carteira);
        return true;
    }

    private CalcularPontos(pontos: number, transacao: ITransacao) : number{
        let result = pontos;
        switch(transacao.tipoTransacao){
            case TipoTransacao.Entrada:
                result + (transacao.valor * 1);
                break;
            case TipoTransacao.Entrada:
                result + (transacao.valor * 1);
                break;
        }
        return result;
    }
}
