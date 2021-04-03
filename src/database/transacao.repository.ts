import ITransacao from '../models/interfaces/Transacao.interface';
import BaseRepository from './base.repository';

export default class TransacaoRepository extends BaseRepository<ITransacao> {
    constructor() {
        super('transacoes');
    }
}