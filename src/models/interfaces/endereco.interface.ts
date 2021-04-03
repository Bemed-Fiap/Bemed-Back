export default interface IEndereco {
    rua: string
    bairro: string
    cidade: string
    estado: string
    numero: number
    complemento: string
    cep: string
    info: string
    coords: {
        lat: number
        lng: number
    }
}