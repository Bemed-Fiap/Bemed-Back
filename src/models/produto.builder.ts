import CategoriaProduto from "../utils/categoria-produto.type";
import TipoMedidaDevolucao from "../utils/tipo-medida-devolucao.type";
import BaseBuilder from "./base.builder";
import IProduto from "./interfaces/Produto.interface";

export default class ProdutoBuilder extends BaseBuilder<IProduto> {
    protected entity: IProduto = {
        _id: null,
        categoria: null,
        comBula: null,
        comCaixa: null,
        comNF: null,
        comReceita: null,
        dosagem: null,
        nome: null,
        fotoBase64: null
        //tipoMedidaDevolucao: null,
    }

    setCategoria = (value: CategoriaProduto)=>{
        this.entity.categoria = value;
        return this;
    }
    setComBula = (value: any)=>{
        this.entity.comBula = value;
        return this;
    }
    setComCaixa = (value: any)=>{
        this.entity.comCaixa = value;
        return this;
    }
    setComNF = (value: any)=>{
        this.entity.comNF = value;
        return this;
    }
    setComReceita = (value: any)=>{
        this.entity.comReceita = value;
        return this;
    }
    setDosagem = (value: any)=>{
        this.entity.dosagem = value;
        return this;
    }
    setNome = (value: any)=>{
        this.entity.nome = value;
        return this;
    }
    setFotoBase64 = (value: any)=>{
        this.entity.fotoBase64 = value;
        return this;
    }
    // setTipoMedidaDevolucao = (value: TipoMedidaDevolucao)=>{
    //     this.entity.tipoMedidaDevolucao = value;
    //     return this;
    // }
}