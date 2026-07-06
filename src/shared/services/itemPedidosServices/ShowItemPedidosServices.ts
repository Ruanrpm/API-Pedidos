import AppError from "../../errors/AppError";
import { AppDataSource } from "../../typeorm/data-source";
import ItemPedidos from "../../typeorm/entities/ItemPedidos";

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