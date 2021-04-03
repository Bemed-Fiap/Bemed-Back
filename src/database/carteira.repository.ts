import ICarteira from '../models/interfaces/Carteira.interface';
import BaseRepository from './base.repository';

export default class CarteiraRepository extends BaseRepository<ICarteira> {
    constructor() {
        super('carteiras');
    }
}