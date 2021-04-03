import TipoTransacao from "../../utils/tipo-transacao.type";

export default interface ITransacao {
    _id: string
    
    farmaciaId: string
    
    produtoId: string
    quantidadeProduto: number
    valor: number
    carteiraDestinoId: string
    tipoTransacao: TipoTransacao

    dtCriacao: Date
    dtAlteracao: Date
}