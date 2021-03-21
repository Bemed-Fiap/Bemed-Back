import TipoMedidaDevolucao from "../utils/tipo-medida-devolucao.type";

export default class BaseBuilder<T extends Object> {
    protected entity: T;
    Build(): T {
        return this.entity;
    }
}