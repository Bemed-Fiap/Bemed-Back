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
}
