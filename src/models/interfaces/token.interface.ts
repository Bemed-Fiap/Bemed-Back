export interface IToken {
    expires: Date,
    usuarioId: string,
    usuarioEmail: string,
    roles: number[]
}