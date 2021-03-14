import IEndereco from "./endereco.interface";

export default interface IUsuario {
    _id: string,
    usuario: string,
    nome: string,
    sobrenome: string,
    email: string,
    nascimento: Date,
    documento: string,
    Endereco: IEndereco
}