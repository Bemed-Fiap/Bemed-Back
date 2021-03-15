import { Request, Response } from 'express';
import HttpStatusCode from '../utils/HttpStatusCode';
import { TokenService } from './../services/token.service';
import moment from 'moment';
const _token = new TokenService();

export class TokenMiddleware {
    async Validate(request: Request, response: Response, next) {
        const { onetoken } = request.headers;

        const tokenDecifrado = await _token.Decifrar(onetoken.toString());

        if (moment(tokenDecifrado.expires) > moment(new Date()) && tokenDecifrado.authenticated) {
            next();
        }
        else {
            response.status(HttpStatusCode.FORBIDDEN);
            response.end();
        }
    }
}