import IEndereco from "./endereco.interface";

export default interface IFarmacia {
    _id: string,
    razao: string,
    nomeFantasia: string,
    email: string,
    cnpj: string,
    senha: string,
    salt: string,
    telefone: string,
    Endereco: IEndereco
}