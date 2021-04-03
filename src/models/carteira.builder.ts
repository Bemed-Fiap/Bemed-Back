import BaseBuilder from "./base.builder";
import ICarteira from "./interfaces/carteira.interface";

export default class CarteiraBuilder extends BaseBuilder<ICarteira>  {
    protected entity: ICarteira = {
        HistoricoTranscoes: null,
        dtAlteracao: null,
        dtCriacao: null,
        usuarioId: null,
        _id: null,
        pontos: null,
    }
    setHistoricoTranscoes = (value: any) => {
        this.entity.HistoricoTranscoes = value;
        return this;
    }
    setDtAlteracao = (value: any) => {
        this.entity.dtAlteracao = value;
        return this;
    }
    setDtCriacao = (value: any) => {
        this.entity.dtCriacao = value;
        return this;
    }
    setUsuarioId = (value: any) => {
        this.entity.usuarioId = value;
        return this;
    }
}