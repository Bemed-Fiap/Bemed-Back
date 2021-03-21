import { FilterQuery } from 'mongodb';
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

    async Update(query: FilterQuery<ICarteira>, carteira: ICarteira) {

        var result = await this.connection.collection.replaceOne(query, carteira);
        return result;
    }
}