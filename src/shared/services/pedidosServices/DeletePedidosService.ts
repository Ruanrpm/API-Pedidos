import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Pedidos from "@shared/typeorm/entities/Pedidos";

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