import { Request, Response } from 'express';
import IFarmacia from '../models/interfaces/Farmacia.interface';
import FarmaciaBuilder from './../models/farmacia.builder';
import FarmaciaService from './../services/farmacia.service';
import HttpStatusCode from '../utils/https-statuscode.type';

const _farmaciaService = new FarmaciaService();

interface IFarmaciaServiceResponse {
    Farmacia: IFarmacia
    nome: string,
    endereco: string,
    cep: string,
    phone: string,
    location: number[]
}

export default class FarmaciaController {
    async Get(request: Request, response: Response): Promise<Response<IFarmaciaServiceResponse[]>> {
        const { id } = request.params;
        try {

            const { nomeFantasia } = request.query;

            let result: IFarmaciaServiceResponse[] = [];
            let farmacias: IFarmacia[] = [];

            if (id) {
                const usr = await _farmaciaService.BuscarPorId(id);
                if (usr) farmacias.push(usr);
            }
            else if (nomeFantasia) { farmacias = await _farmaciaService.BuscarPor(<IFarmacia>{ nomeFantasia: nomeFantasia.toString() }); }
            else { farmacias = await _farmaciaService.BuscarTodos(); }

            farmacias.forEach(_ => result.push({
                Farmacia: _,
                nome: _.nomeFantasia,
                cep: _.Endereco.cep,
                endereco: `${_.Endereco.rua} nr ${_.Endereco.numero} comp ${_.Endereco.complemento}, ${_.Endereco.bairro} - ${_.Endereco.cidade} ${_.Endereco.estado}`,
                location: [_.Endereco.coords.lng, _.Endereco.coords.lat],
                phone: _.telefone
            }));

            if (result.length > 0) return response.json(result);
            return response.sendStatus(HttpStatusCode.BAD_REQUEST);
        } catch (e) {
            return response.sendStatus(HttpStatusCode.BAD_REQUEST);
        }
    }

    async Post(request: Request, response: Response): Promise<Response<IFarmaciaServiceResponse>> {
        const builder = new FarmaciaBuilder();
        const farmaciaRequest = request.body;

        const Farmacia = builder
            .setCnpj(farmaciaRequest.cnpj)
            .setNomeFantasia(farmaciaRequest.nomeFantasia)
            .setEmail(farmaciaRequest.email)
            .setEndereco(farmaciaRequest.Endereco)
            .setRazao(farmaciaRequest.razao)
            .setSalt(farmaciaRequest.salt)
            .setSenha(farmaciaRequest.senha)
            .Build();



        const _ = await _farmaciaService.Criar(Farmacia);

        const result: IFarmaciaServiceResponse = {
            Farmacia: _,
            nome: _.nomeFantasia,
            cep: _.Endereco.cep,
            endereco: `${_.Endereco.rua} nr ${_.Endereco.numero} comp ${_.Endereco.complemento}, ${_.Endereco.bairro} - ${_.Endereco.cidade} ${_.Endereco.estado}`,
            location: [_.Endereco.coords.lng, _.Endereco.coords.lat],
            phone: _.telefone
        };

        return response.json(result);
    }
}