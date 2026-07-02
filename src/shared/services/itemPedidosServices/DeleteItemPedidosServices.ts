import AppError from "../../errors/AppError";
import { AppDataSource } from "../../typeorm/data-source";
import ItemPedidos from "../../typeorm/entities/ItemPedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

interface IRequest {
  id: string;
}

export default class DeleteItemPedidosService {
  public async execute({ id }: IRequest): Promise<void> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);

    const itemPedido = await itemPedidosRepository.findOne({
      where: { id },
      relations: ["pedido"],
    });

    if (!itemPedido) {
      throw new AppError("Item do pedido não encontrado.");
    }

    const pedidoId = itemPedido.pedido?.id;

    await itemPedidosRepository.remove(itemPedido);

    if (pedidoId) {
      await recalcularPedidoTotal(pedidoId);
    }
  }
}