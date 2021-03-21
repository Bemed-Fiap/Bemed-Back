import ITransacao from "./interfaces/transacao.interface";
import ICarteira from "./interfaces/carteira.interface";

export class CarteiraBuilder {
    private entity: ICarteira = {
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
    Build = () => this.entity;
}