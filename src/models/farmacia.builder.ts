import BaseBuilder from "./base.builder";
import IFarmacia from "./interfaces/farmacia.interface";

export default class FarmaciaBuilder extends BaseBuilder<IFarmacia> {
    protected entity: IFarmacia = {
        _id: null,
        Endereco: null,
        cnpj: null,
        email: null,
        razao: null,
        nomeFantasia: null,
        salt: null,
        senha: null,
        telefone: null
    }

    setEndereco = (valor: any) => {
        this.entity.Endereco = valor;
        return this;
    }
    setCnpj = (valor: any) => {
        this.entity.cnpj = valor;
        return this;
    }
    setEmail = (valor: any) => {
        this.entity.email = valor;
        return this;
    }
    setRazao = (valor: any) => {
        this.entity.razao = valor;
        return this;
    }
    setNomeFantasia = (valor: any) => {
        this.entity.nomeFantasia = valor;
        return this;
    }
    setSalt = (valor: any) => {
        this.entity.salt = valor;
        return this;
    }
    setSenha = (valor: any) => {
        this.entity.senha = valor;
        return this;
    }
    setTelefone = (valor: any) => {
        this.entity.telefone = valor;
        return this;
    }
}