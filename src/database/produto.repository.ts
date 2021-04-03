import IProduto from '../models/interfaces/Produto.interface';
import BaseRepository from './base.repository';


export default class ProdutoRepository extends BaseRepository<IProduto> {
    constructor() {
        super('produtos');
    }
}