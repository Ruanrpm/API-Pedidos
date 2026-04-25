import { AppDataSource } from "@shared/typeorm/data-source";
import Pedidos from "@shared/typeorm/entities/Pedidos";

export default class ListPedidosService {
  public async execute(): Promise<Pedidos[]> {
    const pedidosRepository = AppDataSource.getRepository(Pedidos);

    return await pedidosRepository.find();
  }
}