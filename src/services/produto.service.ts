import { Request, response, Response } from 'express';
import IProduto from "./../models/interfaces/produto.interface";
import ProdutoRepository from './../database/produto.repository';
import ProdutoBuilder from './../models/Produto.builder';

const _produto = new ProdutoRepository();
const _builder = new ProdutoBuilder();

interface IProdutoServiceResponse {
    id: string,
    mensagem: string,
    sucesso: boolean,
    Produto: IProduto
}

export default class ProdutoService {

    async Get(request: Request, response: Response): Promise<Response<IProduto[]>> {
        const { id } = request.params;
        const { nome } = request.query;

        let result: IProduto[];

        if (id) { result = [await _produto.GetById(id)]; }
        else if (nome) { result = await _produto.Many({ nome: nome }); }
        else { result = await _produto.All(); }

        return response.json(result);
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

            const ProdutosEncontradas = await _produto.Many({ nome: produto.nome });

            if (ProdutosEncontradas.length > 0) return response.json(ProdutoService.ProdutoJaCadastrado(ProdutosEncontradas[0]));

            const produtoSalvo = await _produto.Insert(produto);

            return response.json(ProdutoService.ProdutoCriadoComSucesso(produtoSalvo));
        } catch (e) {
            return response.json(ProdutoService.ErroAoCriarProduto())
        }
    }

    static ProdutoJaCadastrado(produto: IProduto) {
        return {
            Produto: produto,
            id: produto._id.toString(),
            mensagem: 'Produto já cadastrado!',
            sucesso: true
        };
    }

    static ProdutoCriadoComSucesso(produto: IProduto) {
        return {
            Produto: produto,
            id: produto._id.toString(),
            mensagem: 'Salvo com sucesso!',
            sucesso: true
        };
    }

    static ErroAoCriarProduto() {
        return {
            Produto: null,
            id: null,
            mensagem: 'Erro ao criar produto!',
            sucesso: false
        }
    }
}
