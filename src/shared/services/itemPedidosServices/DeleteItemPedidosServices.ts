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

    const itemPedido = await itemPedidosRepository.findOneBy({ id });

    if (!itemPedido) {
      throw new AppError("Item do pedido não encontrado.");
    }

    await itemPedidosRepository.remove(itemPedido);
    await recalcularPedidoTotal(itemPedido.pedido.id);
  }
}