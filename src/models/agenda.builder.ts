import moment from "moment";
import StatusAgendamento from "../utils/status-agendamento.type copy";
import BaseBuilder from "./base.builder";
import IAgenda from "./interfaces/agenda.interface";

export default class CarteiraBuilder extends BaseBuilder<IAgenda>  {

    protected entity: IAgenda = {
        _id: null,
        cancelado: null,
        dtAgendamentoCriado: null,
        dtDevolucaoConfirmada: null,
        dtPrevistoDevolucao: null,
        farmaciaId: null,
        pontuacaoEfetivada: null,
        pontuacaoPrevista: null,
        produtoId: null,
        quantidadeDescartavelProduto: null,
        quantidadePrevistaProduto: null,
        quantidadeRecebidoAposAnaliseProduto: null,
        recebido: null,
        statusAgendamento: null,
        usuarioId: null,
        Checklist: {
            bula: null,
            bulaRecebida: null,
            receita: null,
            receitaRecebida: null,
            caixa: null,
            caixaRecebida: null,
            nfe: null,
            nfeRecebida: null,
        }
    }

    setId = (value: any) => {
        this.entity._id = value;
        return this;
    }
    setCancelado = (value: any) => {
        this.entity.cancelado = value;
        return this;
    }
    setDtAgendamentoCriado = (value: any) => {
        this.entity.dtAgendamentoCriado = value;
        return this;
    }
    setDtDevolucaoConfirmada = (value: any) => {
        this.entity.dtDevolucaoConfirmada = value;
        return this;
    }
    setDtPrevistoDevolucao = (value: any) => {
        this.entity.dtPrevistoDevolucao = value;
        return this;
    }
    setFarmaciaId = (value: any) => {
        this.entity.farmaciaId = value;
        return this;
    }
    setPontuacaoEfetivada = (value: any) => {
        this.entity.pontuacaoEfetivada = value;
        return this;
    }
    setPontuacaoPrevista = (value: any) => {
        this.entity.pontuacaoPrevista = value;
        return this;
    }
    setProdutoId = (value: any) => {
        this.entity.produtoId = value;
        return this;
    }
    setQuantidadeDescartavelProduto = (value: any) => {
        this.entity.quantidadeDescartavelProduto = value;
        return this;
    }
    setQuantidadePrevistaProduto = (value: any) => {
        this.entity.quantidadePrevistaProduto = value;
        return this;
    }
    setQuantidadeRecebidoAposAnaliseProduto = (value: any) => {
        this.entity.quantidadeRecebidoAposAnaliseProduto = value;
        return this;
    }
    setRecebido = (value: any) => {
        this.entity.recebido = value;
        return this;
    }
    setStatusAgendamento = (value: any) => {
        this.entity.statusAgendamento = value;
        return this;
    }
    setUsuarioId = (value: any) => {
        this.entity.usuarioId = value;
        return this;
    }

    setCheckList = (value: any) => {
        this.entity.Checklist = value;
        return this;
    }

    setBula = (value: any) => {
        this.entity.Checklist.bula = value;
        return this;
    }
    setBulaRecebida = (value: any) => {
        this.entity.Checklist.bulaRecebida = value;
        return this;
    }
    setReceita = (value: any) => {
        this.entity.Checklist.receita = value;
        return this;
    }
    setReceitaRecebida = (value: any) => {
        this.entity.Checklist.receitaRecebida = value;
        return this;
    }
    setCaixa = (value: any) => {
        this.entity.Checklist.caixa = value;
        return this;
    }
    setCaixaRecebida = (value: any) => {
        this.entity.Checklist.caixaRecebida = value;
        return this;
    }
    setNfe = (value: any) => {
        this.entity.Checklist.nfe = value;
        return this;
    }
    setNfeRecebida = (value: any) => {
        this.entity.Checklist.nfeRecebida = value;
        return this;
    }


    CriarAgendamentoUsuario(agendaRequest: IAgenda) {
        this.setCancelado(false)
            .setDtAgendamentoCriado(moment())
            .setDtDevolucaoConfirmada(null)
            .setDtPrevistoDevolucao(agendaRequest.dtPrevistoDevolucao)
            .setFarmaciaId(agendaRequest.farmaciaId)
            .setId(null)
            .setPontuacaoEfetivada(null)
            .setPontuacaoPrevista(agendaRequest.pontuacaoPrevista)
            .setProdutoId(agendaRequest.produtoId)
            .setQuantidadeDescartavelProduto(null)
            .setQuantidadePrevistaProduto(agendaRequest.quantidadePrevistaProduto)
            .setQuantidadeRecebidoAposAnaliseProduto(null)
            .setRecebido(false)
            .setStatusAgendamento(StatusAgendamento.Agendado)
            .setUsuarioId(agendaRequest.usuarioId)
            .setCheckList(agendaRequest.Checklist)
            .setNfeRecebida(false)
            .setBulaRecebida(false)
            .setCaixaRecebida(false)
            .setReceitaRecebida(false);
        return this;
    }

}