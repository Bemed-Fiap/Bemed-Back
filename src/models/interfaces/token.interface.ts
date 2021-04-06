export default interface IToken {
    expires: Date
    usuarioId: string
    usuarioDocumento: string
    roles: number[]
}