export interface IToken {
    expires: Date,
    authenticated: boolean,
    data: string[]
}