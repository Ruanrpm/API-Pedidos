import AppError from "../../errors/AppError";
import { AppDataSource } from "../../typeorm/data-source";
import Pedidos from "../../typeorm/entities/Pedidos";

interface IRequest {
  id: string;
}

export default class DeletePedidosService {
  public async execute({ id }: IRequest): Promise<void> {
    const pedidosRepository = AppDataSource.getRepository(Pedidos);

    const pedido = await pedidosRepository.findOneBy({ id });

    if (!pedido) {
      throw new AppError("Pedido not found.");
    }

    await pedidosRepository.remove(pedido);
  }
}