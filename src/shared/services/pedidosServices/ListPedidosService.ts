import { AppDataSource } from "../../typeorm/data-source";
import Pedidos from "../../typeorm/entities/Pedidos";

export default class ListPedidosService {
  public async execute(): Promise<Pedidos[]> {
    const pedidosRepository = AppDataSource.getRepository(Pedidos);

    return await pedidosRepository.find();
  }
}