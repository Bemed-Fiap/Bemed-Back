import IAgenda from '../models/interfaces/agenda.interface';
import BaseRepository from './base.repository';

export default class AgendaRepository extends BaseRepository<IAgenda> {
    constructor() {
        super('agenda');
    }
}