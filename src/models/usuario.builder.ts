import IUsuario from "./interfaces/usuario.interface";

export class UsuarioBuilder {
    private entity: IUsuario = {
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
    static ConverterInterface(usuario: IUsuario) {
        var keys = ['_id', 'Endereco', 'documento', 'email', 'nascimento', 'nome', 'sobrenome', 'salt', 'senha']
        var keysRemove = Object.keys(usuario).filter(_ => keys.indexOf(_) == -1);
        for (const key of keysRemove) delete usuario[key];
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
    Build = () => this.entity;
}