import { Request, Response } from 'express';
import ProdutoService from '../services/produto.service';
import HttpStatusCode from '../utils/https-statuscode.type';
import IProduto from "./../models/interfaces/produto.interface";
import ProdutoBuilder from './../models/Produto.builder';

const _produtoService = new ProdutoService();

interface IProdutoServiceResponse {
    id: string,
    mensagem: string,
    sucesso: boolean,
    Produto: IProduto
}

export default class ProdutoController {

    async Get(request: Request, response: Response): Promise<Response<IProduto[]>> {
        try {
            const { id } = request.params;
            const { nome } = request.query;

            let result: IProduto[] = [];

            if (id) {
                const produto = await _produtoService.BuscarPorId(id);
                if (produto) result.push(produto);
            }
            else if (nome) { result = await _produtoService.BuscarPor(<IProduto>{ nome: nome.toString() }); }
            else { result = await _produtoService.BuscarTodos(); }

            if (result.length > 0) return response.json(result);
            return response.sendStatus(HttpStatusCode.BAD_REQUEST);
        } catch (e) {
            return response.sendStatus(HttpStatusCode.BAD_REQUEST);
        }
    }

    async Post(request: Request, response: Response): Promise<Response<IProdutoServiceResponse>> {
        try {
            const builder = new ProdutoBuilder();
            const produtoRequest = request.body;

            const produto = builder
                .setCategoria(produtoRequest.categoria)
                .setComBula(produtoRequest.comBula)
                .setComCaixa(produtoRequest.comCaixa)
                .setComNF(produtoRequest.comNF)
                .setComReceita(produtoRequest.comReceita)
                .setDosagem(produtoRequest.dosagem)
                .setNome(produtoRequest.nome)
                //.setTipoMedidaDevolucao(produtoRequest.tipoMedidaDevolucao)
                .Build();

            const produtoSalvo = await _produtoService.Criar(produto);
            return response.json({
                Produto: produtoSalvo,
                id: produtoSalvo._id.toString(),
                mensagem: 'Salvo com sucesso!',
                sucesso: true
            });

        } catch (e) {
            return response.json({
                Produto: null,
                id: null,
                mensagem: 'Erro ao criar produto!',
                sucesso: false
            })
        }
    }
}
