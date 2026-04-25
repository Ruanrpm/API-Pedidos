import { Request, Response, NextFunction, response } from 'express';
import CreatePedidosService from '@shared/services/pedidosServices/CreatePedidosServices';
import DeletePedidosService from '@shared/services/pedidosServices/DeletePedidosService';
import ListPedidosService from '@shared/services/pedidosServices/ListPedidosService';
import ShowPedidosService from '@shared/services/pedidosServices/ShowPedidosService';
import UpdatePedidosService from '@shared/services/pedidosServices/UpdatePedidosService';

export default class PedidosController {

    public async index(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const listPedidos = new ListPedidosService();
            const pedidos = await listPedidos.execute();

            return response.status(200).json(pedidos);
        } catch (err) {
            next(err);
        }
    }

    public async show(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const showPedido = new ShowPedidosService();
            const pedido = await showPedido.execute({ id });
            return response.status(200).json(pedido);
        } catch (err) {
            next(err);
        }
    }

    public async create(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { nome, data_pedido, status, valor_total, forma_pagamento } = request.body;
            const createPedido = new CreatePedidosService();
            const pedido = await createPedido.execute({
                nome, data_pedido, status, valor_total: Number(valor_total), forma_pagamento
            });
            return response.status(201).json(pedido);
        } catch (err) {
            next(err);
        }
    }

    public async update(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { nome, data_pedido, status, valor_total, forma_pagamento } = request.body;
            const updatePedido = new UpdatePedidosService();
            const pedido = await updatePedido.execute({
                id, nome, data_pedido, status, valor_total: Number(valor_total), forma_pagamento
            });
            return response.status(200).json(pedido);
        } catch (err) {
            next(err);
        }
    }

    public async delete(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const deletePedido = new DeletePedidosService();
            await deletePedido.execute({ id });
            return response.status(204).send(); 
        } catch (err) {
            next(err);
        }
    }
}

