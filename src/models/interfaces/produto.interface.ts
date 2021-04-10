import CategoriaProduto from "../../utils/categoria-produto.type";

export default interface IProduto {
    _id: string
    nome: string //Dipirona
    dosagem: string // 25mg
    categoria: CategoriaProduto //comprimido
    //tipoMedidaDevolucao: TipoMedidaDevolucao // comprimido
    
    exigeBula: boolean //não
    exigeCaixa: boolean //não
    exigeReceita: boolean //não
    exigeNF: boolean //sim

    pontosPorUnidade: number 

    fotoBase64: string
}