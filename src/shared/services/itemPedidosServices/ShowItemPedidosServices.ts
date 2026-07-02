import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import ItemPedidos from "@shared/typeorm/entities/ItemPedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

interface IRequest {
  id: string;
}

export default class ShowItemPedidosService {
  public async execute({ id }: IRequest): Promise<ItemPedidos> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);

    const itemPedido = await itemPedidosRepository.findOne({
      where: { id },
      relations: ["pedido"],
    });

    if (!itemPedido) {
      throw new AppError("Item do pedido não encontrado.");
    }

    return itemPedido;
  }
}