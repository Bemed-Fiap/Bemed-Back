import IFarmacia from "../models/interfaces/farmacia.interface";
import FarmaciaRepository from '../database/farmacia.repository';
import FarmaciaBuilder from './../models/farmacia.builder';
import BemedSecurity from '../utils/bemed.security';
import ILoginSecurity from "../models/interfaces/login.security.interface";

const _farmaciaRepository = new FarmaciaRepository();
const _security = new BemedSecurity();

export default class FarmaciaService {

    async BuscarPorId(id: string): Promise<IFarmacia> {
        return await _farmaciaRepository.GetById(id);
    }

    async BuscarPor(usuario: IFarmacia): Promise<IFarmacia[]> {
        return await _farmaciaRepository.Many(usuario);
    }

    async BuscarTodos(): Promise<IFarmacia[]> {
        return await _farmaciaRepository.All();
    }

    async Criar(farmacia: IFarmacia): Promise<IFarmacia> {

        const farmaciasEncontrados = await _farmaciaRepository.Many({ email: farmacia.email });

        if (farmaciasEncontrados.length > 0) {
            return farmaciasEncontrados[0];
        }

        const farmaciaSegura = await _security.GerarCadastroSeguro(<ILoginSecurity>farmacia);
        const farmaciaSalva: IFarmacia = await _farmaciaRepository.Insert(<IFarmacia>farmaciaSegura);

        return farmaciaSalva;
    }
}
