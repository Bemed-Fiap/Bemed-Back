import CategoriaProduto from "../utils/categoria-produto.type";
import TipoMedidaDevolucao from "../utils/tipo-medida-devolucao.type";
import BaseBuilder from "./base.builder";
import IProduto from "./interfaces/Produto.interface";

export default class ProdutoBuilder extends BaseBuilder<IProduto> {
    protected entity: IProduto = {
        _id: null,
        categoria: null,
        exigeBula: null,
        exigeCaixa: null,
        exigeNF: null,
        exigeReceita: null,
        dosagem: null,
        nome: null,
        fotoBase64: null,
        pontosPorUnidade: null
        //tipoMedidaDevolucao: null,
    }

    setCategoria = (value: CategoriaProduto)=>{
        this.entity.categoria = value;
        return this;
    }
    setExigeBula = (value: any)=>{
        this.entity.exigeBula = value;
        return this;
    }
    setExigeCaixa = (value: any)=>{
        this.entity.exigeCaixa = value;
        return this;
    }
    setExigeNF = (value: any)=>{
        this.entity.exigeNF = value;
        return this;
    }
    setExigeReceita = (value: any)=>{
        this.entity.exigeReceita = value;
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
    setPontosPorUnidade = (value: any)=>{
        this.entity.pontosPorUnidade = value;
        return this;
    }
    // setTipoMedidaDevolucao = (value: TipoMedidaDevolucao)=>{
    //     this.entity.tipoMedidaDevolucao = value;
    //     return this;
    // }
}