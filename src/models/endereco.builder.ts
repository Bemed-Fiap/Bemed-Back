import IEndereco from "./interfaces/Endereco.interface";

export class EnderecoBuilder {
    private entity: IEndereco = {
        cep: null,
        complemento: null,
        info: null,
        numero: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
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
    setBairro = (valor: any) => {
        this.entity.bairro = valor;
        return this;
    }
    setCidade = (valor: any) => {
        this.entity.cidade = valor;
        return this;
    }
    setEstado = (valor: any) => {
        this.entity.estado = valor;
        return this;
    }
    Build = () => this.entity;
}