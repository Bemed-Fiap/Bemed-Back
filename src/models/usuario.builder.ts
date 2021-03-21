import BaseBuilder from "./base.builder";
import IUsuario from "./interfaces/usuario.interface";

export default class UsuarioBuilder extends BaseBuilder<IUsuario> {
    protected entity: IUsuario = {
        _id: null,
        Endereco: null,
        documento: null,
        email: null,
        nascimento: null,
        nome: null,
        sobrenome: null,
        salt: null,
        senha: null
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
    setSalt = (valor: any) => {
        this.entity.salt = valor;
        return this;
    }
    setSenha = (valor: any) => {
        this.entity.senha = valor;
        return this;
    }
}