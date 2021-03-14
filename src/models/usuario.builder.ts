import IUsuario from "./interfaces/usuario.interface";

export class UsuarioBuilder {
    private entity: IUsuario = {
        Endereco: null,
        documento: null,
        email: null,
        nascimento: null,
        nome: null,
        sobrenome: null,
        usuario: null,
        _id: null
    }
    setEndereco = (valor: any) => {
        this.entity.Endereco = valor;
        return this;
    }
    setDocumento = (valor: any) => {
        this.entity.documento = valor;
        return this;
    }
    setEmail = (valor: any) => {
        this.entity.email = valor;
        return this;
    }
    setNascimento = (valor: any) => {
        this.entity.nascimento = valor;
        return this;
    }
    setNome = (valor: any) => {
        this.entity.nome = valor;
        return this;
    }
    setSobrenome = (valor: any) => {
        this.entity.sobrenome = valor;
        return this;
    }
    setUsuario = (valor: any) => {
        this.entity.usuario = valor;
        return this;
    }
    Build = () => this.entity;
}