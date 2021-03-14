import IUsuario from '../models/interfaces/usuario.interface';
import { BaseRepository } from './base.repository';


export class UsuarioRepository extends BaseRepository<IUsuario> {
    async Many(mongoFind: any): Promise<IUsuario[]> {
        var result = this.connection.collection.find(mongoFind).toArray();
        return result;
    }
}