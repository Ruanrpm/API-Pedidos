import { AppDataSource } from "../../typeorm/data-source";
import ItemPedidos from "../../typeorm/entities/ItemPedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

export default class ListItemPedidosService {
  public async execute(): Promise<ItemPedidos[]> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);

    return itemPedidosRepository.find({
      relations: ["pedido"],
    });
  }
}