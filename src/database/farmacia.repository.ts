import IFarmacia from '../models/interfaces/farmacia.interface';
import { BaseRepository } from './base.repository';


export class FarmaciaRepository extends BaseRepository<IFarmacia> {
    constructor() {
        super('farmacias');
    }

    async Many(mongoFind: any): Promise<IFarmacia[]> {
        var result = this.connection.collection.find(mongoFind).toArray();
        return result;
    }
}