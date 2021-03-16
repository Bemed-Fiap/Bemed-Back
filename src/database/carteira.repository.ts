import ICarteira from '../models/interfaces/Carteira.interface';
import { BaseRepository } from './base.repository';


export class CarteiraRepository extends BaseRepository<ICarteira> {

    constructor() {
        super('carteiras');
    }

    async Many(mongoFind: any): Promise<ICarteira[]> {
        var result = await this.connection.collection.find(mongoFind).toArray();
        return result;
    }

    async Update(_id: string, carteira: ICarteira) {

        var result = await this.connection.collection.updateOne({ _id: _id }, carteira);
        return result;
    }
}