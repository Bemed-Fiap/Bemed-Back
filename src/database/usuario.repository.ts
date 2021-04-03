import IUsuario from '../models/interfaces/usuario.interface';
import BaseRepository from './base.repository';

export default class UsuarioRepository extends BaseRepository<IUsuario> {
    constructor() {
        super('usuarios');
    }
}