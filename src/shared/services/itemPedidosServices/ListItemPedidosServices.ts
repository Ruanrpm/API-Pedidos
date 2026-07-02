import { AppDataSource } from "@shared/typeorm/data-source";
import ItemPedidos from "@shared/typeorm/entities/ItemPedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

export default class ListItemPedidosService {
  public async execute(): Promise<ItemPedidos[]> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);

    return itemPedidosRepository.find({
      relations: ["pedido"],
    });
  }
}