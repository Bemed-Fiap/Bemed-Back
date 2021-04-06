import IAgenda from "../models/interfaces/Agenda.interface";
import AgendaRepository from '../database/Agenda.repository';

const _agendaRepository = new AgendaRepository();


export default class AgendaService {
    async BuscarPorId(id: string): Promise<IAgenda> {
        return await _agendaRepository.GetById(id);
    }

    async BuscarPor(Agenda: IAgenda): Promise<IAgenda[]> {
        return await _agendaRepository.Many(Agenda);
    }

    async BuscarTodos(): Promise<IAgenda[]> {
        return await _agendaRepository.All();
    }

    async Criar(agenda: IAgenda): Promise<IAgenda> {
        const agendaSalva: IAgenda = await _agendaRepository.Insert(agenda);
        return agendaSalva;
    }
}
