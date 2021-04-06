import TipoMedidaDevolucao from "../../utils/tipo-medida-devolucao.type";
import CategoriaProduto from "../../utils/categoria-produto.type";

export default interface IProduto {
    _id: string
    nome: string //Dipirona
    dosagem: string // 25mg
    categoria: CategoriaProduto //comprimido
    //tipoMedidaDevolucao: TipoMedidaDevolucao // comprimido
    
    comBula: boolean //não
    comCaixa: boolean //não
    comReceita: boolean //não
    comNF: boolean //sim

    fotoBase64: string
}