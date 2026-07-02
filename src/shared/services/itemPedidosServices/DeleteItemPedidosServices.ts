import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import ItemPedidos from "@shared/typeorm/entities/ItemPedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

interface IRequest {
  id: string;
}

export default class DeleteItemPedidosService {
  public async execute({ id }: IRequest): Promise<void> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);

    const itemPedido = await itemPedidosRepository.findOneBy({ id });

    if (!itemPedido) {
      throw new AppError("Item do pedido não encontrado.");
    }

    await itemPedidosRepository.remove(itemPedido);
    await recalcularPedidoTotal(itemPedido.pedido.id);
  }
}