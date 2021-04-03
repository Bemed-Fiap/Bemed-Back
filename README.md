# Bemed-Back

## For DEVS 

### Criando um domínio
* Criar um modelo (./src/model/interfaces/{dominio}.interface.ts)
    * Interfaces devem começar com o "I" maiusculo, para indica Interface (Ex: IUsuario)

* Criar um builder (./src/model/{dominio}.builder.ts)
    * Builders devem finalizar o nome da classe com Builder (Ex. UsuarioBuilder)

* Criar repositório em ./src/database/{dominio}.repository.ts
    * Herdar da classe BaseRepository<I{dominio}>
    * Repositorios devem terminar com o nome da classe com Respoitory (Ex. UsuarioRepository)

* Criar um serviço para lidar com request/response (./src/services/{dominio}.service.ts)
    * Serviços devem terminar com o nome da classe com Service (Ex. UsuarioService)

### .env configuration

| Chave | Descricao | Exemplo |
| ----- | --------- | ------- |
| PORT | Porta de execução da api | 9978 |
| SECRET | Segredo da criptografia, deve conter 32 caracteres | FF0989DADB121045 |
| MONGOURL | Url de conexão com o mongoDB | mongodb://localhost:27017 |
| MONGODATABASE | Nome da base de dados no mongoDb | bemed-beta |
| TOKENEXPIRATION | Tempo em minutos de expiração do token de usuário | 10 |