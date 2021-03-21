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

    async BuscarPorId(id: string): Promise<IProduto> {
        return await _produto.GetById(id);
    }

    async BuscarPor(produto: IProduto): Promise<IProduto[]> {
        return await _produto.Many(produto);
    }

    async BuscarTodos(): Promise<IProduto[]> {
        return await _produto.All();
    }

    async Criar(produto: IProduto): Promise<IProduto> {

        const ProdutosEncontrados = await _produto.Many({ nome: produto.nome });

        if (ProdutosEncontrados.length > 0) return ProdutosEncontrados[0];

        const produtoSalvo = await _produto.Insert(produto);

        return produtoSalvo;
    }
}
