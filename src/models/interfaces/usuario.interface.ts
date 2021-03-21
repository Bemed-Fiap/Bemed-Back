import IEndereco from "./endereco.interface";

export default interface IUsuario {
    _id: string
    nome: string
    sobrenome: string
    email: string
    nascimento: Date
    documento: string
    senha: string
    salt: string
    Endereco: IEndereco
}