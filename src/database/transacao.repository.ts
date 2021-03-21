import ITransacao from '../models/interfaces/Transacao.interface';
import { BaseRepository } from './base.repository';


export class TransacaoRepository extends BaseRepository<ITransacao> {

    constructor() {
        super('transacoes');
    }

    async Many(mongoFind: any): Promise<ITransacao[]> {
        var result = await this.connection.collection.find(mongoFind).toArray();
        return result;
    }

    async Update(_id: string, transacao: ITransacao) {

        var result = await this.connection.collection.updateOne({ _id: _id }, transacao);
        return result;
    }
}