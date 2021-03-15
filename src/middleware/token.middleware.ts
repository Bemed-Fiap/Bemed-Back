import { Request, Response } from 'express';
import HttpStatusCode from '../utils/HttpStatusCode';
import { TokenService } from './../services/token.service';
import moment from 'moment';
import SecurityRoles from '../utils/SecurityRoles';

const _tokenService = new TokenService();

const allowedRoles = [SecurityRoles.UsuarioAdministrativo, SecurityRoles.UsuarioFarmacia, SecurityRoles.UsuarioPessoaFisica];

export class TokenMiddleware {
    async Validate(request: Request, response: Response, next) {
        const { onetoken } = request.headers;

        const tokenDecifrado = await _tokenService.Decifrar(onetoken.toString());
        const roles = tokenDecifrado.roles.filter(_ => allowedRoles.indexOf(_) > -1);

        if (moment(tokenDecifrado.expires) > moment(new Date()) && roles.length > 0) {
            next();
        }
        else {
            response.status(HttpStatusCode.FORBIDDEN);
            response.end();
        }
    }
}