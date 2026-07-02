import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import ItemPedidos from "@shared/typeorm/entities/ItemPedidos";
import Pedidos from "@shared/typeorm/entities/Pedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

interface IRequest {
  pedido_id: string;
  nome_item: string;
  quantidade: number;
  preco_unitario: number;
  observacao?: string;
  tamanho?: string;
}

export default class CreateItemPedidosService {
  public async execute({
    pedido_id,
    nome_item,
    quantidade,
    preco_unitario,
    observacao,
    tamanho,
  }: IRequest): Promise<ItemPedidos> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);
    const pedidosRepository = AppDataSource.getRepository(Pedidos);

    const pedido = await pedidosRepository.findOne({
      where: { id: pedido_id },
    });

    if (!pedido) {
      throw new AppError("Pedido not found.");
    }

    const itemPedidoExists = await itemPedidosRepository.findOne({
      where: {
        pedido: { id: pedido_id },
        nome_item,
      },
      relations: ["pedido"],
    });

    if (itemPedidoExists) {
      throw new AppError("Não existe um pedido com esse nome.");
    }

    const subtotal = quantidade * preco_unitario;

    const itemPedidoData: Partial<ItemPedidos> = {
        pedido,
        nome_item,
        quantidade,
        preco_unitario,
        subtotal,
    };

    if (observacao !== undefined) {
        itemPedidoData.observacao = observacao;
    }

    if (tamanho !== undefined) {
        itemPedidoData.tamanho = tamanho;
    }

const itemPedido = itemPedidosRepository.create(itemPedidoData);

    await itemPedidosRepository.save(itemPedido);
    await recalcularPedidoTotal(pedido_id);

    return itemPedido;
  }
}