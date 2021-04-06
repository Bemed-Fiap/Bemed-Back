// import { Request, Response } from 'express';
// import IAgenda from '../models/interfaces/Agenda.interface';
// import AgendaBuilder from './../models/Agenda.builder';
// import AgendaService from './../services/Agenda.service';
// import IProduto from '../models/interfaces/produto.interface';
// import ProdutoService from '../services/produto.service';
// import IFarmacia from '../models/interfaces/farmacia.interface';
// import FarmaciaService from '../services/Farmacia.service';
// import IUsuario from '../models/interfaces/Usuario.interface';
// import UsuarioService from '../services/Usuario.service';

// import ProdutoBuilder from '../models/Produto.builder';
// import HttpStatusCode from '../utils/https-statuscode.type';

// const _agendaService = new AgendaService();
// const _produtoService = new ProdutoService();
// const _farmaciaService = new FarmaciaService();
// const _usuarioService = new UsuarioService();

// interface IAgendaServiceResponse { Agenda: IAgenda, Produto: IProduto, Farmacia: IFarmacia, Usuario: IUsuario }

// export default class AgendaController {
//     async Get(request: Request, response: Response): Promise<Response<IAgendaServiceResponse[]>> {
//         const { id } = request.params;
//         try {
//             const usr = request['usr'];
//             let result: IAgendaServiceResponse[] = [];
//             let Agendas: IAgenda[] = [];

//             if (id) {
//                 const agenda = await _agendaService.BuscarPorId(id);
//                 if(agenda) Agendas.push(usr);
//             }
//             else { Agendas = await _agendaService.BuscarTodos(); }

//             for (const u of Agendas) {
//                 const produto = await _produtoService.BuscarPorId(u.produtoId);
//                 const farmacia = await _farmaciaService.BuscarPorId(u.produtoId);
//                 const usuario = await _usuarioService.BuscarPorId(u.usuarioId);
//                 result.push({ Agenda: u, Farmacia: farmacia, Produto: produto, Usuario: usuario });
//             }
//             if (result.length > 0) return response.json(result);
//             return response.sendStatus(HttpStatusCode.BAD_REQUEST);
//         } catch (e) {
//             return response.sendStatus(HttpStatusCode.BAD_REQUEST);
//         }
//     }

//     async Post(request: Request, response: Response): Promise<Response<IAgendaServiceResponse>> {
//         const builder = new AgendaBuilder();
//         const builderProduto = new ProdutoBuilder();
//         const agendaRequest = request.body;

//         let produto = null;

//         // Valida existencia da farmacia
//         const farmacia = await _farmaciaService.BuscarPorId(agendaRequest.farmaciaId);
//         if (!farmacia || !farmacia._id) return response.sendStatus(HttpStatusCode.BAD_REQUEST); 

//         // Se não houver produtoId, cria um novo Produto
//         if (!agendaRequest.produtoId) {
//             produto = builderProduto
//                 .setCategoria(agendaRequest.Produto.categoria)
//                 .setDosagem(agendaRequest.Produto.dosagem)
//                 .setNome(agendaRequest.Produto.nome)
//                 .Build();

//             produto = await _produtoService.Criar(produto);
//         } else {
//             produto = await _produtoService.BuscarPorId(agendaRequest.produtoId)
//         }

//         // Controi a agenda
//         const agenda = builder
//             .CriarAgendamentoUsuario(agendaRequest)
//             .Build();

//         const agendaSalva = await _agendaService.CriarAgenda(agenda);

//         const result: IAgendaServiceResponse = {
//             Agenda: agendaSalva,
//             Farmacia: farmacia,
//             Produto: produto
//         };


//         return response.json(result);
//     }
// }