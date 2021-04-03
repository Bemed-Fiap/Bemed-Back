import ICarteira from "./../models/interfaces/Carteira.interface";
import CarteiraRepository from './../database/Carteira.repository';
import CarteiraBuilder from './../models/Carteira.builder';
import IUsuario from "../models/interfaces/usuario.interface";
import moment from "moment";

const _carteira = new CarteiraRepository();
const _builder = new CarteiraBuilder();

export default class CarteiraService {
    async CriarCarteira(usuario: IUsuario): Promise<ICarteira> {
        
        const carteirasEncontradas = await _carteira.Many({ usuarioId: usuario._id });
        if (carteirasEncontradas.length > 0) return carteirasEncontradas[0];

        const carteira = await _carteira.Insert(_builder
            .setUsuarioId(usuario._id)
            .setDtCriacao(moment().toDate())
            .setDtAlteracao(moment().toDate())
            .setHistoricoTranscoes([]).Build()
        );
        return carteira;
    }
    
    async GetByUsuario(usuario: IUsuario): Promise<ICarteira> {
        const carteirasEncontradas = await _carteira.Many({ usuarioId: usuario._id });
        if (carteirasEncontradas.length > 0) return carteirasEncontradas[0];
        return null;
    }
}
