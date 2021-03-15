import IFarmacia from "../models/interfaces/farmacia.interface";
import { FarmaciaRepository } from '../database/farmacia.repository';
import { FarmaciaBuilder } from './../models/farmacia.builder';
import { BemedSecurity } from '../utils/bemed.security';
import { Request, Response } from 'express';
const _farmaciaRepository = new FarmaciaRepository();
const _security = new BemedSecurity();
const _builder = new FarmaciaBuilder();

export class FarmaciaService {

    async Get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { nome } = request.query;

        let result: IFarmacia[];

        if (id) { result = [await _farmaciaRepository.GetById(id)]; }
        else if (nome) { result = await _farmaciaRepository.Many({ nome: nome }); }
        else { result = await _farmaciaRepository.All(); }

        return response.json(result);
    }

    async Post(request: Request, response: Response): Promise<Response> {
        const farmacia = request.body as IFarmacia;
        const farmaciaSeguro = await _security.GerarFarmaciaSeguro(farmacia);
        _builder.ConverterInterface(farmaciaSeguro);
        const result = await _farmaciaRepository.Insert(farmaciaSeguro);

        return response.json(result);
    }
}

/*
builder
.setCnpj('60387635000115')
.setEmail('mail@mail.com')
.setEndereco(enderecoBuilder
    .setCep('09999999')
    .setComplemento('Bloco x Apto y')
    .setInfo('Próximo ao metro z')
    .setNumero(41)
    .setRua('Rua A')
    .setBairro('Bairro B')
    .setCidade('Cidade C')
    .setEstado('Estado D')
    .Build())
.setRazao('Drogaria São Paulo S.a.')
.setNomeFantasia('Drogaria São Paulo')
.Build()
*/