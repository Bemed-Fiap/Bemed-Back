import ITransacao from "./transacao.interface";

export default interface ICarteira {
    _id: string,
    usuarioId: string,
    pontos: number,
    dtCriacao: Date,
    dtAlteracao: Date,
    HistoricoTranscoes: string[]
}