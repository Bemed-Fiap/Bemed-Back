import IEndereco from "./interfaces/Endereco.interface";

export class EnderecoBuilder {
    private entity: IEndereco = {
        cep: null,
        complemento: null,
        info: null,
        numero: null,
        rua: null,
    }
    setCep = (valor: any) => {
        this.entity.cep = valor;
        return this;
    }
    setComplemento = (valor: any) => {
        this.entity.complemento = valor;
        return this;
    }
    setInfo = (valor: any) => {
        this.entity.info = valor;
        return this;
    }
    setNumero = (valor: any) => {
        this.entity.numero = valor;
        return this;
    }
    setRua = (valor: any) => {
        this.entity.rua = valor;
        return this;
    }
    Build = () => this.entity;
}