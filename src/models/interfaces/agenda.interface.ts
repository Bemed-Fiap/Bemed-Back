import StatusAgendamento from "../../utils/status-agendamento.type copy";

export default interface IAgenda {
    _id: string

    usuarioId: string
    farmaciaId: string
    produtoId: string

    quantidadePrevistaProduto: number // Usuário prevê devolver x comprimidos
    quantidadeDescartavelProduto: number // Farmacêutico identifica y produtos que não serão reutilizáveis
    quantidadeRecebidoAposAnaliseProduto: number // Farmacêutico indica quanto produtos de fato podem ser reutilizados

    pontuacaoPrevista: number
    pontuacaoEfetivada: number

    statusAgendamento: StatusAgendamento

    dtAgendamentoCriado: Date
    dtPrevistoDevolucao: Date
    dtDevolucaoConfirmada: Date

    recebido: boolean
    cancelado: boolean

    Checklist: {
        bula: boolean, //usuario disse q vai devolver
        bulaRecebida: boolean //farmaceutico confirma de recebeu

        receita: boolean
        receitaRecebida: boolean

        caixa: boolean
        caixaRecebida: boolean
        
        nfe: boolean
        nfeRecebida: boolean
    }
}