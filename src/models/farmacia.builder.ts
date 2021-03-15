import IFarmacia from "./interfaces/farmacia.interface";

export class FarmaciaBuilder {
    private entity: IFarmacia = {
        _id: null,
        Endereco: null,
        cnpj: null,
        email: null,
        razao: null,
        nomeFantasia: null,
        salt: null,
        senha: null
    }
    ConverterInterface(farmacia: IFarmacia) {
        var keys = Object.keys(this.entity);
        var keysRemove = Object.keys(farmacia).filter(_ => keys.indexOf(_) == -1);
        for (const key of keysRemove) delete farmacia[key];
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
    Build = () => this.entity;
}