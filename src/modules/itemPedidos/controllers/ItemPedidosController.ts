import { Request, Response, NextFunction } from 'express';
import CreateItemPedidosService from '@shared/services/itemPedidosServices/CreateItemPedidosServices';
import DeleteItemPedidosService from '@shared/services/itemPedidosServices/DeleteItemPedidosServices';
import ListItemPedidosService from '@shared/services/itemPedidosServices/ListItemPedidosServices';
import ShowItemPedidosService from '@shared/services/itemPedidosServices/ShowItemPedidosServices';
import UpdateItemPedidosService from '@shared/services/itemPedidosServices/UpdateItemPedidosServices';

export default class ItemPedidosController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const listItemPedidos = new ListItemPedidosService();
      const itemPedidos = await listItemPedidos.execute();

      return response.json(itemPedidos);
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

      const showItemPedidos = new ShowItemPedidosService();
      const itemPedido = await showItemPedidos.execute({ id });

      return response.json(itemPedido);
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
      const {
        pedido_id,
        nome_item,
        quantidade,
        preco_unitario,
        observacao,
        tamanho,
      } = request.body;

      const createItemPedidos = new CreateItemPedidosService();

      const itemPedido = await createItemPedidos.execute({
        pedido_id,
        nome_item,
        quantidade,
        preco_unitario,
        observacao,
        tamanho,
      });

      return response.status(201).json(itemPedido);
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

      const {
        pedido_id,
        nome_item,
        quantidade,
        preco_unitario,
        observacao,
        tamanho,
      } = request.body;

      const updateItemPedidos = new UpdateItemPedidosService();

      const itemPedido = await updateItemPedidos.execute({
        id,
        pedido_id,
        nome_item,
        quantidade,
        preco_unitario,
        observacao,
        tamanho,
      });

      return response.json(itemPedido);
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

      const deleteItemPedidos = new DeleteItemPedidosService();

      await deleteItemPedidos.execute({ id });

      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}