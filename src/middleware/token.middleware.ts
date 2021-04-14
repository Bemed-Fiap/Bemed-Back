import { Request, Response } from 'express';
import HttpStatusCode from '../utils/https-statuscode.type';
import TokenService from './../services/token.service';
import moment from 'moment';
import SecurityRoles from '../utils/security-roles.type';

const _tokenService = new TokenService();

const allowedRoles = [SecurityRoles.UsuarioAdministrativo, SecurityRoles.UsuarioFarmacia, SecurityRoles.UsuarioPessoaFisica];

export default class TokenMiddleware {
    async Validate(request: Request, response: Response, next) {
        const { onetoken } = request.headers;

        if (!onetoken) {
            return response.status(HttpStatusCode.UNAUTHORIZED).send();
        }

        const tokenDecifrado = await _tokenService.Decifrar(onetoken.toString());
        if (tokenDecifrado) {
            const roles = tokenDecifrado.roles.filter(_ => allowedRoles.indexOf(_) > -1);

            if (moment(tokenDecifrado.expires) > moment(new Date()) && roles.length > 0) {
                request['usr'] = tokenDecifrado.usuarioId;
                request['documento'] = tokenDecifrado.usuarioDocumento;
                next();
            }
            else {
                return response.status(HttpStatusCode.UNAUTHORIZED).send();
            }
        } else {
            return response.status(HttpStatusCode.UNAUTHORIZED).send();
        }
    }

    async TestRoute(request: Request, response: Response) {
        return response.json({ congrats: 'You are in!' });
    }
}