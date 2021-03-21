import BaseBuilder from "./base.builder";
import ITransacao from "./interfaces/transacao.interface";

export default class TransacaoBuilder extends BaseBuilder<ITransacao> {
    protected entity: ITransacao = {
        _id: null,
        dtAlteracao: null,
        dtCriacao: null,
        produtoId: null,
        quantidadeProduto: null,
        tipoTransacao: null,
        valor: null,
        carteiraDestinoId: null,
        farmaciaId: null
    }
    setId = (value: any) => {
        this.entity._id = value;
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
    setProdutoId = (value: any) => {
        this.entity.produtoId = value;
        return this;
    }
    setQuantidadeProduto = (value: any) => {
        this.entity.quantidadeProduto = value;
        return this;
    }
    setTipoTransacao = (value: any) => {
        this.entity.tipoTransacao = value;
        return this;
    }
    setValor = (value: any) => {
        this.entity.valor = value;
        return this;
    }
    setCarteiraDestinoId = (value: any) => {
        this.entity.carteiraDestinoId = value;
        return this;
    }
    setFarmaciaId = (value: any) => {
        this.entity.farmaciaId = value;
        return this;
    }
}