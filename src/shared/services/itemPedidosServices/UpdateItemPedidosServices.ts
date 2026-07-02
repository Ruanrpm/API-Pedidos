import AppError from "../../errors/AppError";
import { AppDataSource } from "../../typeorm/data-source";
import ItemPedidos from "../../typeorm/entities/ItemPedidos";
import Pedidos from "../../typeorm/entities/Pedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

interface IRequest {
  id: string;
  pedido_id: string;
  nome_item: string;
  quantidade: number;
  preco_unitario: number;
  observacao?: string;
  tamanho?: string;
}

export default class UpdateItemPedidosService {
  public async execute({
    id,
    pedido_id,
    nome_item,
    quantidade,
    preco_unitario,
    observacao,
    tamanho,
  }: IRequest): Promise<ItemPedidos> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);
    const pedidosRepository = AppDataSource.getRepository(Pedidos);

    const itemPedido = await itemPedidosRepository.findOne({
      where: { id },
      relations: ["pedido"],
    });

    if (!itemPedido) {
      throw new AppError("Item do pedido não encontrado.");
    }

    const pedido = await pedidosRepository.findOneBy({ id: pedido_id });

    if (!pedido) {
      throw new AppError("Pedido não encontrado.");
    }

    const itemExists = await itemPedidosRepository.findOne({
      where: {
        nome_item,
        pedido: { id: pedido_id },
      },
      relations: ["pedido"],
    });

    if (itemExists && itemExists.id !== itemPedido.id) {
      throw new AppError("Já existe um item com esse nome neste pedido.");
    }

    const subtotal = quantidade * preco_unitario;

    itemPedido.pedido = pedido;
    itemPedido.nome_item = nome_item;
    itemPedido.quantidade = quantidade;
    itemPedido.preco_unitario = preco_unitario;
    itemPedido.subtotal = subtotal;

    if (observacao !== undefined) {
      itemPedido.observacao = observacao;
    }

    if (tamanho !== undefined) {
      itemPedido.tamanho = tamanho;
    }

    await itemPedidosRepository.save(itemPedido);
    await recalcularPedidoTotal(pedido_id);

    return itemPedido;
  }
}