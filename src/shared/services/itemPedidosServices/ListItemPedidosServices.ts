import { AppDataSource } from "../../typeorm/data-source";
import ItemPedidos from "../../typeorm/entities/ItemPedidos";

export default class ListItemPedidosService {
  public async execute(): Promise<ItemPedidos[]> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);

    return itemPedidosRepository.find({
      relations: ["pedido"],
    });
  }
}