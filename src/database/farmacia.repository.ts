import IFarmacia from '../models/interfaces/farmacia.interface';
import BaseRepository from './base.repository';

export default class FarmaciaRepository extends BaseRepository<IFarmacia> {
    constructor() {
        super('farmacias');
    }
}